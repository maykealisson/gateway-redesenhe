import { Injectable } from '@nestjs/common';
import { LibertyProventoClient } from 'src/client/liberty.provento.client';
import {
  IImportacaoProventos,
  IProvento,
  IProventosResumo,
} from './model/provento.model';
import {
  AlterarTipoRequest,
  ProventoRequest,
} from './request/provento.request';

@Injectable()
export class ProventoService {
  constructor(private readonly client: LibertyProventoClient) {}

  criar(token: string, request: ProventoRequest): Promise<IProvento> {
    return this.client.criar(token, request);
  }

  atualizar(
    token: string,
    id: string,
    request: ProventoRequest,
  ): Promise<IProvento> {
    return this.client.atualizar(token, id, request);
  }

  deletar(token: string, id: string): Promise<void> {
    return this.client.deletar(token, id);
  }

  resumo(token: string, ano?: number): Promise<IProventosResumo> {
    return this.client.resumo(token, ano);
  }

  importar(
    token: string,
    meses: number,
    confirmar: boolean,
  ): Promise<IImportacaoProventos> {
    return this.client.importar(token, meses, confirmar);
  }

  alterarTipo(
    token: string,
    id: string,
    request: AlterarTipoRequest,
  ): Promise<IProvento> {
    return this.client.alterarTipo(token, id, request);
  }
}
