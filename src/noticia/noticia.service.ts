import { Injectable, Logger } from '@nestjs/common';
import { FinNewClient } from 'src/client/fin-news.client';
import { LibertyInvestimentoClient } from 'src/client/liberty.investimento.client';
import { INoticiaItem } from 'src/investimento/model/investimento.model';
import {
  INoticiaCarteira,
  INoticiasAtivo,
  INoticiasCarteira,
} from './model/noticia.model';

const CONCORRENCIA = 4;
const DIA_MS = 24 * 60 * 60 * 1000;

@Injectable()
export class NoticiaService {
  private readonly logger = new Logger(NoticiaService.name);

  constructor(
    private readonly investimentoClient: LibertyInvestimentoClient,
    private readonly finNews: FinNewClient,
  ) {}

  /**
   * Notícias dos ativos de renda variável do usuário nos últimos `dias`,
   * agrupadas por ticker. Uma notícia que cita vários ativos aparece uma vez,
   * no primeiro ticker, com a lista de todos em `tickers`.
   */
  async carteira(
    token: string,
    dias: number,
    agora = new Date(),
  ): Promise<INoticiasCarteira> {
    const tickers = [
      ...new Set(
        (await this.investimentoClient.buscarTickets(token))
          .map((t) => t?.trim().toUpperCase())
          .filter(Boolean),
      ),
    ];
    const resultados = await this.buscarComLimite(tickers);
    const limite = agora.getTime() - dias * DIA_MS;

    const porLink = new Map<string, INoticiaCarteira>();
    const ativos: INoticiasAtivo[] = [];

    for (const { ticker, noticias, erro } of resultados) {
      const doAtivo: INoticiaCarteira[] = [];
      for (const noticia of noticias) {
        const data = new Date(noticia.data).getTime();
        if (!noticia.link || Number.isNaN(data) || data < limite) continue;
        const existente = porLink.get(noticia.link);
        if (existente) {
          if (!existente.tickers.includes(ticker))
            existente.tickers.push(ticker);
          continue;
        }
        const item = { ...noticia, tickers: [ticker] };
        porLink.set(noticia.link, item);
        doAtivo.push(item);
      }
      doAtivo.sort(
        (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
      );
      ativos.push({
        ticker,
        total: doAtivo.length,
        noticias: doAtivo,
        ...(erro ? { erro } : {}),
      });
    }

    ativos.sort(
      (a, b) => b.total - a.total || a.ticker.localeCompare(b.ticker),
    );
    return { dias, total: porLink.size, ativos };
  }

  private async buscarComLimite(
    tickers: string[],
  ): Promise<{ ticker: string; noticias: INoticiaItem[]; erro: boolean }[]> {
    const resultados: {
      ticker: string;
      noticias: INoticiaItem[];
      erro: boolean;
    }[] = new Array(tickers.length);
    let proximo = 0;
    const trabalhador = async () => {
      while (proximo < tickers.length) {
        const indice = proximo++;
        const ticker = tickers[indice];
        try {
          const resposta = await this.finNews.buscarNoticia(ticker);
          resultados[indice] = {
            ticker,
            noticias: resposta?.noticias ?? [],
            erro: false,
          };
        } catch (error: any) {
          this.logger.warn(
            `Falha ao buscar notícias de ${ticker}: ${error?.message}`,
          );
          resultados[indice] = { ticker, noticias: [], erro: true };
        }
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(CONCORRENCIA, tickers.length) }, () =>
        trabalhador(),
      ),
    );
    return resultados;
  }
}
