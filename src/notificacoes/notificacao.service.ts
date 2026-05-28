import { Injectable, Logger } from '@nestjs/common';
import { LibertyNotificacaoClient } from 'src/client/liberty.notificacao.client';
import { Notificacao } from './model/notificacao.model';

@Injectable()
export class NotificacaoService {
  private readonly logger = new Logger(NotificacaoService.name);

  constructor(private readonly client: LibertyNotificacaoClient) {}

  async buscarTodas(token: string): Promise<Notificacao[]> {
    this.logger.log(`Buscando notificacoes`);
    return await this.client.buscarTodos(token);
  }

  async atualizar(token: string, id: string): Promise<void> {
    this.logger.log(`Atualizando notificacao: ${id}}`);
    return await this.client.atualizar(token, id);
  }
}
