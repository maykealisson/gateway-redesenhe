import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  ICarteira,
  IInvestimento,
  IInvestimentoItem,
} from 'src/investimento/model/investimento.model';
import {
  InvestimentoRequest,
  InvestimentoUpdateRequest,
} from 'src/investimento/request/investimento.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyInvestimentoClient {
  private baseURL = process.env.URL_LIBERTY;
  private path = '/v1/ativos';

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyInvestimentoClient.name);

  public async criar(
    token: string,
    body: InvestimentoRequest,
  ): Promise<IInvestimentoItem> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<IInvestimentoItem>(
        this.baseURL + this.path,
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar investimento: ${error.message}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao criar investimento',
        error.response?.status || 500,
      );
    }
  }

  public async buscarTodos(
    token: string,
    pagina?: number,
  ): Promise<IInvestimento> {
    try {
      var path = this.path;
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<IInvestimento>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar investimentos: ${error.message}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar investimentos',
        error?.status || 500,
      );
    }
  }

  public async buscarPorSegmento(
    token: string,
    segmento: string,
    pagina?: number,
  ): Promise<IInvestimento> {
    try {
      var path = this.path + '/segmento/' + segmento;
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<IInvestimento>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar investimento por segmento: ${error.message}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar investimento por segmento',
        error?.status || 500,
      );
    }
  }

  public async atualizar(
    token: string,
    id: string,
    body: InvestimentoUpdateRequest,
  ): Promise<IInvestimentoItem> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.put<IInvestimentoItem>(
        this.baseURL + this.path + `/${id}`,
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Erro ao atualizar investimento: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error.reponse?.data || 'Erro ao atualizar investimento',
        error.response?.status || 500,
      );
    }
  }

  public async deletar(token: string, id: string): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.delete<any>(
        this.baseURL + this.path + `/${id}`,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao deletar investimento: ${error.message}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao deletar investimento',
        error.response?.status || 500,
      );
    }
  }

  public async buscarCarteira(token: string): Promise<ICarteira> {
    try {
      var path = this.path + '/carteira';

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<ICarteira>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar carteira: ${error.message}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar carteira',
        error?.status || 500,
      );
    }
  }

  public async consolidar(token: string): Promise<any> {
    try {
      var path = this.path + '/consolida-carteira';

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<any>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao consolidar carteira: ${error.message}`);
      throw new HttpException(
        error?.message || 'Erro ao consolidar carteira',
        error?.status || 500,
      );
    }
  }
}
