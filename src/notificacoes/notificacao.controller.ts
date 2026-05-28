import { Controller, UseGuards, Get, Param, Put, Req } from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { NotificacaoService } from './notificacao.service';
import { Notificacao } from './model/notificacao.model';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/notificacoes')
export class NotificacaoController {
  constructor(private readonly service: NotificacaoService) {}

  @Get()
  async buscarTodas(@Req() req): Promise<Notificacao[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodas(token);
  }

  @Put(':id')
  async atualizar(@Req() req, @Param('id') id: string): Promise<void> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, id);
  }
}
