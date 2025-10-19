import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  IAtivoNota,
  IAtivoNotaItem,
} from 'src/investimento/model/investimento.model';
import { InvestimentoNotaRequest } from 'src/investimento/request/investimento.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyInvestimentoNotaClient {
  private baseURL = process.env.URL_LIBERTY;
  private path = '/v1/ativo';

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyInvestimentoNotaClient.name);

  public async criar(
    token: string,
    idInvestimento: number,
    body: InvestimentoNotaRequest,
  ): Promise<IAtivoNotaItem> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<IAtivoNotaItem>(
        this.baseURL + this.path + '/' + idInvestimento + '/notas',
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar nota investimento: ${error.message}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao criar nota investimento',
        error.response?.status || 500,
      );
    }
  }

  public async buscarTodos(
    token: string,
    idInvestimento: number,
    pagina?: number,
  ): Promise<IAtivoNota> {
    try {
      var path = this.path + `/${idInvestimento}/notas`;
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<IAtivoNota>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar nota investimento: ${error.message}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar nota investimento',
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
        this.baseURL + this.path + '/' + idInvestimento + '/notas/' + id,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao deletar nota investimento: ${error.message}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao deletar nota investimento',
        error.response?.status || 500,
      );
    }
  }
}
