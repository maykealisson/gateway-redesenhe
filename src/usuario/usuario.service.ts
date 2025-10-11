import { Injectable, Logger } from '@nestjs/common';
import { UsuarioRequest } from './request/usuario.request';
import { AcessoModel } from './model/acesso.model';
import { LibertyClient } from 'src/client/liberty.client';
import { AcessoRequest } from './request/acesso.request';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly clientLiberty: LibertyClient) {}

  async criar(request: UsuarioRequest): Promise<AcessoModel> {
    this.logger.log(
      `Criando usuário: ${JSON.stringify(request.nome)}- ${JSON.stringify(request.email)}`,
    );
    return await this.clientLiberty.criarUsuario(request);
  }

  async login(request: AcessoRequest): Promise<AcessoModel> {
    this.logger.log(`Login usuário: ${JSON.stringify(request.email)}}`);
    return await this.clientLiberty.login(request);
  }
}
