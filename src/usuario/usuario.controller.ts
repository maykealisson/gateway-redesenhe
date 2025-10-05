import { Controller, Post, Body, Req } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AcessoRequest } from './request/acesso.request';
import { UsuarioRequest } from './request/usuario.request';
import { AcessoModel } from './model/acesso.model';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createUsuario(
    @Req() req,
    @Body() payload: UsuarioRequest,
  ): Promise<AcessoModel> {
    return this.usuarioService.criar(req.headers, payload);
  }

  @Post('login')
  async login(@Body() payload: AcessoRequest): Promise<AcessoModel> {
    return this.usuarioService.login(payload);
  }
}
