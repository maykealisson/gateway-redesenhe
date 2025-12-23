import { Injectable, Logger } from '@nestjs/common';
import {
  UsuarioRequest,
  UsuarioUpdateEmailRequest,
  UsuarioUpdateSenhaRequest,
} from './request/usuario.request';
import { AcessoModel, UsuarioInfoModel } from './model/usuario.model';
import { LibertyUsuarioClient } from 'src/client/liberty.usuario.client';
import { AcessoRequest } from './request/acesso.request';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  constructor(private readonly clientLiberty: LibertyUsuarioClient) {}

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

  async info(token: string): Promise<UsuarioInfoModel> {
    this.logger.log(`Info usuário`);
    return await this.clientLiberty.buscarInfo(token);
  }

  async updateSenha(
    request: UsuarioUpdateSenhaRequest,
    token: string,
  ): Promise<void> {
    this.logger.log(`Update senha usuário: }`);
    return await this.clientLiberty.updateSenha(request, token);
  }

  async updateEmail(
    request: UsuarioUpdateEmailRequest,
    token: string,
  ): Promise<void> {
    this.logger.log(
      `Update email usuário: ${JSON.stringify(request.novo_email)}}`,
    );
    return await this.clientLiberty.updateEmail(request, token);
  }
}
