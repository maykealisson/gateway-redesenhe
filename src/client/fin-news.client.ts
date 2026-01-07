import { HttpException, Injectable, Logger } from '@nestjs/common';
import { INoticiasResponse } from 'src/investimento/model/investimento.model';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class FinNewClient {
  private baseURL = process.env.URL_FIN_NEWS;

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(FinNewClient.name);

  public async buscarNoticia(ticket: string): Promise<INoticiasResponse> {
    try {
      var path = '/v1/noticias?ativo=' + ticket;
      const headers = {
        // No auth needed
      };
      const response = await this.requestServer.get<INoticiasResponse>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar noticia: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar noticia',
        error?.status || 500,
      );
    }
  }
}
