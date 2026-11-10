import { HttpException, Injectable, Logger } from '@nestjs/common';
import { IAlerta } from 'src/alerta/model/alerta.model';
import { AlertaRequest } from 'src/alerta/request/alerta.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyAlertaClient {
  private baseURL = process.env.URL_LIBERTY;
  private readonly path = '/v1/alertas';
  private readonly logger = new Logger(LibertyAlertaClient.name);

  constructor(private readonly requestServer: RequestService) {}

  public async listar(token: string, idAtivo?: number): Promise<IAlerta[]> {
    const query = idAtivo ? `?id_ativo=${idAtivo}` : '';
    return this.executar('buscar alertas', () =>
      this.requestServer.get<IAlerta[]>(
        `${this.baseURL}${this.path}${query}`,
        this.headers(token),
      ),
    );
  }

  public async criar(token: string, body: AlertaRequest): Promise<IAlerta> {
    return this.executar('criar alerta', () =>
      this.requestServer.post<IAlerta>(
        this.baseURL + this.path,
        body,
        this.headers(token),
      ),
    );
  }

  public async atualizar(
    token: string,
    id: string,
    body: AlertaRequest,
  ): Promise<IAlerta> {
    return this.executar('atualizar alerta', () =>
      this.requestServer.put<IAlerta>(
        `${this.baseURL}${this.path}/${encodeURIComponent(id)}`,
        body,
        this.headers(token),
      ),
    );
  }

  public async deletar(token: string, id: string): Promise<void> {
    return this.executar('remover alerta', () =>
      this.requestServer.delete<void>(
        `${this.baseURL}${this.path}/${encodeURIComponent(id)}`,
        this.headers(token),
      ),
    );
  }

  private headers(token: string): Record<string, string> {
    return { Authorization: `Bearer ${token}` };
  }

  private async executar<T>(
    acao: string,
    chamada: () => Promise<T>,
  ): Promise<T> {
    try {
      return await chamada();
    } catch (error: any) {
      this.logger.error(`Erro ao ${acao}: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || `Erro ao ${acao}`,
        error?.status || 500,
      );
    }
  }
}
