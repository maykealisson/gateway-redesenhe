import { HttpException, Injectable, Logger } from '@nestjs/common';
import { LibertyInvestimentoClient } from 'src/client/liberty.investimento.client';
import {
  InvestimentoRequest,
  InvestimentoUpdateRequest,
} from './request/investimento.request';
import {
  ICarteira,
  IInvestimento,
  IInvestimentoItem,
} from './model/investimento.model';

@Injectable()
export class InvestimentoService {
  private readonly logger = new Logger(InvestimentoService.name);

  constructor(private readonly clientInvestimento: LibertyInvestimentoClient) {}

  async criar(
    token: string,
    request: InvestimentoRequest,
  ): Promise<IInvestimentoItem> {
    this.logger.log(
      `Cadastrando investimento: ${JSON.stringify(request.ticket)}`,
    );
    return await this.clientInvestimento.criar(token, request);
  }

  async buscarTodos(token: string, pagina?: number): Promise<IInvestimento> {
    this.logger.log(`Buscando investimentos: ${pagina}}`);
    return await this.clientInvestimento.buscarTodos(token, pagina);
  }

  async buscarPorSegmento(
    token: string,
    segmento: string,
    pagina?: number,
  ): Promise<IInvestimento> {
    if (!segmento) {
      throw new HttpException('Segmento é obrigatório', 400);
    }
    this.logger.log(`Buscando investimento: ${segmento}- ${pagina}`);
    return await this.clientInvestimento.buscarPorSegmento(
      token,
      segmento,
      pagina,
    );
  }

  async atualizar(
    token: string,
    id: string,
    request: InvestimentoUpdateRequest,
  ): Promise<IInvestimentoItem> {
    this.logger.log(`Atualizando investimento: ${id}`);
    return await this.clientInvestimento.atualizar(token, id, request);
  }

  async buscarCarteira(token: string): Promise<ICarteira> {
    this.logger.log(`Buscando carteira`);
    return await this.clientInvestimento.buscarCarteira(token);
  }

  async consolidar(token: string): Promise<any> {
    this.logger.log(`Consolidando carteira`);
    return await this.clientInvestimento.consolidar(token);
  }

  async deletar(token: string, id: string): Promise<any> {
    this.logger.log(`Deletando investimento: ${id}`);
    return await this.clientInvestimento.deletar(token, id);
  }
}
