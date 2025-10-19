import { Injectable, Logger } from '@nestjs/common';
import { InvestimentoNotaRequest } from './request/investimento.request';
import { IAtivoNota, IAtivoNotaItem } from './model/investimento.model';
import { LibertyInvestimentoNotaClient } from 'src/client/liberty.investimento.nota.client';

@Injectable()
export class InvestimentoNotaService {
  private readonly logger = new Logger(InvestimentoNotaService.name);

  constructor(private readonly client: LibertyInvestimentoNotaClient) {}

  async criar(
    token: string,
    idInvestimento: number,
    request: InvestimentoNotaRequest,
  ): Promise<IAtivoNotaItem> {
    this.logger.log(`Cadastrando nota para investimento: ${idInvestimento}`);
    return await this.client.criar(token, idInvestimento, request);
  }

  async buscarTodos(
    token: string,
    idInvestimento: number,
    pagina?: number,
  ): Promise<IAtivoNota> {
    this.logger.log(`Buscando notas: ${pagina}}`);
    return await this.client.buscarTodos(token, idInvestimento, pagina);
  }

  async deletar(
    token: string,
    idInvestimento: number,
    id: number,
  ): Promise<any> {
    this.logger.log(`Deletando nota: ${id}`);
    return await this.client.deletar(token, idInvestimento, id);
  }
}
