import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Meta } from 'src/meta/model/meta.model';
import { MetaRequest } from 'src/meta/request/meta.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyMetaClient {
  private baseURL = process.env.URL_LIBERTY;

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyMetaClient.name);

  public async buscarMetas(token: string): Promise<Meta[]> {
    try {
      var path = '/v1/metas';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<Meta[]>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar metas: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar metas',
        error?.status || 500,
      );
    }
  }

  public async criar(token: string, body: MetaRequest): Promise<Meta> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<Meta>(
        this.baseURL + '/v1/metas',
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar meta: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao criar meta',
        error?.status || 500,
      );
    }
  }

  public async atualizar(
    token: string,
    id: string,
    body: MetaRequest,
  ): Promise<Meta> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.put<Meta>(
        this.baseURL + '/v1/metas/' + id,
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao atualizar meta: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao atualizar meta',
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
        this.baseURL + '/v1/metas/' + id,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao deletar meta: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao deletar meta',
        error.response?.status || 500,
      );
    }
  }
}
