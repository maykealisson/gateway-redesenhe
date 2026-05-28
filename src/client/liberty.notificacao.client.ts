import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Notificacao } from 'src/notificacoes/model/notificacao.model';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyNotificacaoClient {
  private baseURL = process.env.URL_LIBERTY;
  private path = '/v1/notificacoes';

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyNotificacaoClient.name);

  public async buscarTodos(token: string): Promise<Notificacao[]> {
    try {
      var path = this.path;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<Notificacao[]>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar notificacoes: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar notificacoes',
        error?.status || 500,
      );
    }
  }

  public async atualizar(token: string, id: string): Promise<void> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.put<void>(
        this.baseURL + this.path + `/${id}`,
        null,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao atualizar notificacao: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error.reponse?.data || 'Erro ao atualizar notificacao',
        error.response?.status || 500,
      );
    }
  }
}
