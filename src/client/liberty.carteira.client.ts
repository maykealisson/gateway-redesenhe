import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  IAlocacaoAlvo,
  IBenchmarks,
  IRebalanceamento,
} from 'src/carteira/model/carteira.model';
import { AlocacaoAlvoRequest } from 'src/carteira/request/alocacao-alvo.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyCarteiraClient {
  private baseURL = process.env.URL_LIBERTY;
  private readonly logger = new Logger(LibertyCarteiraClient.name);

  constructor(private readonly requestServer: RequestService) {}

  public async buscarAlocacaoAlvo(token: string): Promise<IAlocacaoAlvo[]> {
    return this.executar('buscar alocação alvo', () =>
      this.requestServer.get<IAlocacaoAlvo[]>(
        this.baseURL + '/v1/carteira/alocacao-alvo',
        this.headers(token),
      ),
    );
  }

  public async salvarAlocacaoAlvo(
    token: string,
    body: AlocacaoAlvoRequest,
  ): Promise<IAlocacaoAlvo[]> {
    return this.executar('salvar alocação alvo', () =>
      this.requestServer.put<IAlocacaoAlvo[]>(
        this.baseURL + '/v1/carteira/alocacao-alvo',
        body,
        this.headers(token),
      ),
    );
  }

  public async rebalancear(
    token: string,
    aporte: number,
  ): Promise<IRebalanceamento> {
    return this.executar('calcular rebalanceamento', () =>
      this.requestServer.get<IRebalanceamento>(
        `${this.baseURL}/v1/carteira/rebalanceamento?aporte=${encodeURIComponent(aporte)}`,
        this.headers(token),
      ),
    );
  }

  public async benchmarks(
    token: string,
    inicio?: string,
  ): Promise<IBenchmarks> {
    const query = inicio ? `?inicio=${encodeURIComponent(inicio)}` : '';
    return this.executar('comparar com benchmarks', () =>
      this.requestServer.get<IBenchmarks>(
        `${this.baseURL}/v1/carteira/benchmarks${query}`,
        this.headers(token),
      ),
    );
  }

  private headers(token: string): Record<string, string> {
    return { Authorization: `Bearer ${token}` };
  }

  private async executar<T>(
    acao: string,
    chamada: () => Promise<T>,
  ): Promise<T> {
    try {
      return await chamada();
    } catch (error: any) {
      this.logger.error(`Erro ao ${acao}: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || `Erro ao ${acao}`,
        error?.status || 500,
      );
    }
  }
}
