import { Injectable, Logger } from '@nestjs/common';
import { UsuarioRequest } from './request/usuario.request';
import { AcessoModel } from './model/acesso.model';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);

  async criar(request: UsuarioRequest): Promise<AcessoModel> {
    this.logger.log(
      `Criando usuário: ${JSON.stringify(request.nome)}- ${JSON.stringify(request.email)}`,
    );
  }

  async login(request: UsuarioRequest): Promise<AcessoModel> {
    this.logger.log(
      `Criando usuário: ${JSON.stringify(request.nome)}- ${JSON.stringify(request.email)}`,
    );
  }
}
