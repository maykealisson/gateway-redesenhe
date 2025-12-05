import { Injectable, Logger } from '@nestjs/common';
import { LibertyMetaClient } from 'src/client/liberty.meta.client';
import { Meta } from './model/meta.model';
import { MetaRequest } from './request/meta.request';

@Injectable()
export class MetaService {
  private readonly logger = new Logger(MetaService.name);

  constructor(private readonly clientMeta: LibertyMetaClient) {}

  async buscarTodas(token: string): Promise<Meta[]> {
    this.logger.log(`Buscando metas`);
    return await this.clientMeta.buscarMetas(token);
  }

  async criar(token: string, request: MetaRequest): Promise<Meta> {
    this.logger.log(`Criando meta: ${JSON.stringify(request.nome)}`);
    return await this.clientMeta.criar(token, request);
  }

  async atualizar(
    token: string,
    id: string,
    request: MetaRequest,
  ): Promise<Meta> {
    this.logger.log(`Atualizando meta: ${id}}`);
    return await this.clientMeta.atualizar(token, id, request);
  }

  async deletar(token: string, id: string): Promise<any> {
    this.logger.log(`Deletando meta: ${id}}`);
    return await this.clientMeta.deletar(token, id);
  }
}
