import { HttpException, Injectable, Logger } from '@nestjs/common';
import { IMarco, IRevisao, Meta } from 'src/meta/model/meta.model';
import { MarcoRequest } from 'src/meta/request/marco.request';
import { RevisaoRequest } from 'src/meta/request/revisao.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyMetaAcompanhamentoClient {
  private baseURL = process.env.URL_LIBERTY;
  private readonly logger = new Logger(LibertyMetaAcompanhamentoClient.name);

  constructor(private readonly requestServer: RequestService) {}

  criarMarco(
    token: string,
    idMeta: string,
    body: MarcoRequest,
  ): Promise<IMarco> {
    return this.executar('criar marco', () =>
      this.requestServer.post<IMarco>(
        `${this.url(idMeta)}/marcos`,
        body,
        this.headers(token),
      ),
    );
  }

  atualizarMarco(
    token: string,
    idMeta: string,
    idMarco: string,
    body: MarcoRequest,
  ): Promise<IMarco> {
    return this.executar('atualizar marco', () =>
      this.requestServer.put<IMarco>(
        `${this.url(idMeta)}/marcos/${encodeURIComponent(idMarco)}`,
        body,
        this.headers(token),
      ),
    );
  }

  deletarMarco(token: string, idMeta: string, idMarco: string): Promise<void> {
    return this.executar('remover marco', () =>
      this.requestServer.delete<void>(
        `${this.url(idMeta)}/marcos/${encodeURIComponent(idMarco)}`,
        this.headers(token),
      ),
    );
  }

  listarRevisoes(token: string, idMeta: string): Promise<IRevisao[]> {
    return this.executar('buscar revisões', () =>
      this.requestServer.get<IRevisao[]>(
        `${this.url(idMeta)}/revisoes`,
        this.headers(token),
      ),
    );
  }

  revisar(
    token: string,
    idMeta: string,
    body: RevisaoRequest,
  ): Promise<IRevisao> {
    return this.executar('registrar revisão', () =>
      this.requestServer.post<IRevisao>(
        `${this.url(idMeta)}/revisoes`,
        body,
        this.headers(token),
      ),
    );
  }

  revisoesPendentes(token: string): Promise<Meta[]> {
    return this.executar('buscar revisões pendentes', () =>
      this.requestServer.get<Meta[]>(
        `${this.baseURL}/v1/metas/revisoes/pendentes`,
        this.headers(token),
      ),
    );
  }

  private url(idMeta: string): string {
    return `${this.baseURL}/v1/metas/${encodeURIComponent(idMeta)}`;
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
