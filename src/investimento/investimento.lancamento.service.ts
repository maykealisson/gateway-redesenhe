import { Injectable, Logger } from '@nestjs/common';
import { InvestimentoLancamentoRequest } from './request/investimento.request';
import { ILancamento, ILancamentoItem } from './model/investimento.model';
import { LibertyInvestimentoLancamentoClient } from 'src/client/liberty.investimento.lancamento.client';

@Injectable()
export class InvestimentoLancamentoService {
  private readonly logger = new Logger(InvestimentoLancamentoService.name);

  constructor(
    private readonly clientLancamento: LibertyInvestimentoLancamentoClient,
  ) {}

  async criar(
    token: string,
    idInvestimento: number,
    request: InvestimentoLancamentoRequest,
  ): Promise<ILancamentoItem> {
    this.logger.log(
      `Cadastrando lancamento para investimento: ${idInvestimento}`,
    );
    return await this.clientLancamento.criar(token, idInvestimento, request);
  }

  async buscarTodos(
    token: string,
    idInvestimento: number,
    pagina?: number,
  ): Promise<ILancamento> {
    this.logger.log(`Buscando lancamentos: ${pagina}}`);
    return await this.clientLancamento.buscarTodos(
      token,
      idInvestimento,
      pagina,
    );
  }

  async deletar(
    token: string,
    idInvestimento: number,
    id: number,
  ): Promise<any> {
    this.logger.log(`Deletando lancamento: ${id}`);
    return await this.clientLancamento.deletar(token, idInvestimento, id);
  }
}
