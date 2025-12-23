import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Req,
  Put,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { AcessoRequest } from './request/acesso.request';
import {
  UsuarioRequest,
  UsuarioUpdateEmailRequest,
  UsuarioUpdateSenhaRequest,
} from './request/usuario.request';
import { AcessoModel, UsuarioInfoModel } from './model/usuario.model';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';

@Controller('v1/usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createUsuario(@Body() payload: UsuarioRequest): Promise<AcessoModel> {
    return this.usuarioService.criar(payload);
  }

  @Post('login')
  async login(@Body() payload: AcessoRequest): Promise<AcessoModel> {
    return this.usuarioService.login(payload);
  }

  @UseGuards(AuthorizationHeaderGuard)
  @Get()
  async info(@Req() req): Promise<UsuarioInfoModel> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.usuarioService.info(token);
  }

  @UseGuards(AuthorizationHeaderGuard)
  @Put('senha')
  async updateSenha(
    @Body() payload: UsuarioUpdateSenhaRequest,
    @Req() req,
  ): Promise<void> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.usuarioService.updateSenha(payload, token);
  }

  @UseGuards(AuthorizationHeaderGuard)
  @Put('email')
  async updateEmail(
    @Body() payload: UsuarioUpdateEmailRequest,
    @Req() req,
  ): Promise<void> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.usuarioService.updateEmail(payload, token);
  }
}
