import { Injectable, Logger } from '@nestjs/common';
import { LibertyCarteiraClient } from 'src/client/liberty.carteira.client';
import {
  IAlocacaoAlvo,
  IBenchmarks,
  IRebalanceamento,
} from './model/carteira.model';
import { AlocacaoAlvoRequest } from './request/alocacao-alvo.request';

@Injectable()
export class CarteiraService {
  private readonly logger = new Logger(CarteiraService.name);

  constructor(private readonly client: LibertyCarteiraClient) {}

  async buscarAlocacaoAlvo(token: string): Promise<IAlocacaoAlvo[]> {
    return this.client.buscarAlocacaoAlvo(token);
  }

  async salvarAlocacaoAlvo(
    token: string,
    request: AlocacaoAlvoRequest,
  ): Promise<IAlocacaoAlvo[]> {
    this.logger.log(
      `Salvando alocação alvo com ${request.alocacoes.length} segmentos`,
    );
    return this.client.salvarAlocacaoAlvo(token, request);
  }

  async rebalancear(token: string, aporte: number): Promise<IRebalanceamento> {
    return this.client.rebalancear(token, aporte);
  }

  async benchmarks(token: string, inicio?: string): Promise<IBenchmarks> {
    return this.client.benchmarks(token, inicio);
  }
}
