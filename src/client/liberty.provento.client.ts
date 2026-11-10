import { HttpException, Injectable, Logger } from '@nestjs/common';
import {
  IImportacaoProventos,
  IProvento,
  IProventosResumo,
} from 'src/provento/model/provento.model';
import {
  AlterarTipoRequest,
  ProventoRequest,
} from 'src/provento/request/provento.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyProventoClient {
  private baseURL = process.env.URL_LIBERTY;
  private readonly path = '/v1/proventos';
  private readonly logger = new Logger(LibertyProventoClient.name);

  constructor(private readonly requestServer: RequestService) {}

  public async criar(token: string, body: ProventoRequest): Promise<IProvento> {
    return this.executar('lançar provento', () =>
      this.requestServer.post<IProvento>(
        this.baseURL + this.path,
        body,
        this.headers(token),
      ),
    );
  }

  public async atualizar(
    token: string,
    id: string,
    body: ProventoRequest,
  ): Promise<IProvento> {
    return this.executar('atualizar provento', () =>
      this.requestServer.put<IProvento>(
        `${this.baseURL}${this.path}/${encodeURIComponent(id)}`,
        body,
        this.headers(token),
      ),
    );
  }

  public async deletar(token: string, id: string): Promise<void> {
    return this.executar('remover provento', () =>
      this.requestServer.delete<void>(
        `${this.baseURL}${this.path}/${encodeURIComponent(id)}`,
        this.headers(token),
      ),
    );
  }

  public async resumo(token: string, ano?: number): Promise<IProventosResumo> {
    const query = ano ? `?ano=${ano}` : '';
    return this.executar('buscar resumo de proventos', () =>
      this.requestServer.get<IProventosResumo>(
        `${this.baseURL}${this.path}/resumo${query}`,
        this.headers(token),
      ),
    );
  }

  public async importar(
    token: string,
    meses: number,
    confirmar: boolean,
  ): Promise<IImportacaoProventos> {
    return this.executar('importar proventos', () =>
      this.requestServer.post<IImportacaoProventos>(
        `${this.baseURL}${this.path}/importacao?meses=${meses}&confirmar=${confirmar}`,
        {},
        this.headers(token),
      ),
    );
  }

  public async alterarTipo(
    token: string,
    id: string,
    body: AlterarTipoRequest,
  ): Promise<IProvento> {
    return this.executar('alterar tipo do provento', () =>
      this.requestServer.patch<IProvento>(
        `${this.baseURL}${this.path}/${encodeURIComponent(id)}/tipo`,
        body,
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
