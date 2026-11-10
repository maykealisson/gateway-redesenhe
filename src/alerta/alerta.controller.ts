import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { AlertaService } from './alerta.service';
import { IAlerta } from './model/alerta.model';
import { AlertaRequest } from './request/alerta.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/alertas')
export class AlertaController {
  constructor(private readonly service: AlertaService) {}

  @Get()
  async listar(
    @Req() req,
    @Query('id_ativo', new ParseIntPipe({ optional: true })) idAtivo?: number,
  ): Promise<IAlerta[]> {
    return this.service.listar(token(req), idAtivo);
  }

  @Post()
  async criar(@Req() req, @Body() request: AlertaRequest): Promise<IAlerta> {
    return this.service.criar(token(req), request);
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: AlertaRequest,
  ): Promise<IAlerta> {
    return this.service.atualizar(token(req), id, request);
  }

  @Delete(':id')
  @HttpCode(204)
  async deletar(@Req() req, @Param('id') id: string): Promise<void> {
    return this.service.deletar(token(req), id);
  }
}

function token(req: any): string {
  return req.headers['authorization'].replace('Bearer ', '');
}
