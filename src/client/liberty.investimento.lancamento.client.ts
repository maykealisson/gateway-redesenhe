import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  ILancamento,
  ILancamentoItem,
} from 'src/investimento/model/investimento.model';
import { InvestimentoLancamentoRequest } from 'src/investimento/request/investimento.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyInvestimentoLancamentoClient {
  private baseURL = process.env.URL_LIBERTY;
  private path = '/v1/ativos';

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(
    LibertyInvestimentoLancamentoClient.name,
  );

  public async criar(
    token: string,
    idInvestimento: number,
    body: InvestimentoLancamentoRequest,
  ): Promise<ILancamentoItem> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<ILancamentoItem>(
        this.baseURL + this.path + '/' + idInvestimento + '/lancamentos',
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar lancamento: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao criar lancamento',
        error.response?.status || 500,
      );
    }
  }

  public async buscarTodos(
    token: string,
    idLInvestimento: number,
    pagina?: number,
  ): Promise<ILancamento> {
    try {
      var path = this.path + `/${idLInvestimento}/lancamentos`;
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<ILancamento>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar lancamento: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar lancamento',
        error?.status || 500,
      );
    }
  }

  public async deletar(
    token: string,
    idInvestimento: number,
    id: number,
  ): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.delete<any>(
        this.baseURL + this.path + '/' + idInvestimento + '/lancamentos/' + id,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao deletar lancamento: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao deletar lancamento',
        error.response?.status || 500,
      );
    }
  }
}
