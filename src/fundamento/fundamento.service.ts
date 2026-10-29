import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AgentFundamentClient } from 'src/client/agent-fundament.client';
import {
  IAnaliseResumo,
  IAnaliseUpload,
  IRelatorioAnalise,
} from './model/fundamento.model';
import { AnaliseRequest } from './request/analise.request';

const TICKER_VALIDO = /^[A-Za-z0-9.\-]{1,20}$/;

@Injectable()
export class FundamentoService {
  private readonly logger = new Logger(FundamentoService.name);

  constructor(private readonly client: AgentFundamentClient) {}

  async enviarAnalise(
    ticker: string,
    request: AnaliseRequest,
  ): Promise<IAnaliseUpload> {
    this.logger.log(
      `Enviando análise do ticker ${ticker}: ${request.nome_arquivo ?? '-'}`,
    );
    return await this.client.enviarAnalise(this.validarTicker(ticker), request);
  }

  async listarAnalises(ticker: string): Promise<IAnaliseResumo[]> {
    this.logger.log(`Buscando análises do ticker ${ticker}`);
    return await this.client.listarAnalises(this.validarTicker(ticker));
  }

  async gerarRelatorio(
    ticker: string,
    margemDesejada?: number,
  ): Promise<IRelatorioAnalise> {
    this.logger.log(`Processando relatório do ticker ${ticker}`);
    return await this.client.gerarRelatorio(
      this.validarTicker(ticker),
      margemDesejada,
    );
  }

  async removerAnalise(id: number): Promise<void> {
    this.logger.log(`Removendo análise ${id}`);
    await this.client.removerAnalise(id);
  }

  private validarTicker(ticker: string): string {
    if (!TICKER_VALIDO.test(ticker ?? '')) {
      throw new HttpException('Ticker inválido', HttpStatus.BAD_REQUEST);
    }
    return ticker.toUpperCase();
  }
}
