import { Injectable } from '@nestjs/common';
import { LibertyAlertaClient } from 'src/client/liberty.alerta.client';
import { IAlerta } from './model/alerta.model';
import { AlertaRequest } from './request/alerta.request';

@Injectable()
export class AlertaService {
  constructor(private readonly client: LibertyAlertaClient) {}

  listar(token: string, idAtivo?: number): Promise<IAlerta[]> {
    return this.client.listar(token, idAtivo);
  }

  criar(token: string, request: AlertaRequest): Promise<IAlerta> {
    return this.client.criar(token, request);
  }

  atualizar(
    token: string,
    id: string,
    request: AlertaRequest,
  ): Promise<IAlerta> {
    return this.client.atualizar(token, id, request);
  }

  deletar(token: string, id: string): Promise<void> {
    return this.client.deletar(token, id);
  }
}
