import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { LibertyMetaAcompanhamentoClient } from 'src/client/liberty.meta.acompanhamento.client';
import { IMarco, IRevisao, Meta } from './model/meta.model';
import { MarcoRequest } from './request/marco.request';
import { RevisaoRequest } from './request/revisao.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/metas')
export class MetaAcompanhamentoController {
  constructor(private readonly client: LibertyMetaAcompanhamentoClient) {}

  @Get('revisoes/pendentes')
  async revisoesPendentes(@Req() req): Promise<Meta[]> {
    return this.client.revisoesPendentes(token(req));
  }

  @Post(':id/marcos')
  async criarMarco(
    @Req() req,
    @Param('id') id: string,
    @Body() request: MarcoRequest,
  ): Promise<IMarco> {
    return this.client.criarMarco(token(req), id, request);
  }

  @Put(':id/marcos/:idMarco')
  async atualizarMarco(
    @Req() req,
    @Param('id') id: string,
    @Param('idMarco') idMarco: string,
    @Body() request: MarcoRequest,
  ): Promise<IMarco> {
    return this.client.atualizarMarco(token(req), id, idMarco, request);
  }

  @Delete(':id/marcos/:idMarco')
  @HttpCode(204)
  async deletarMarco(
    @Req() req,
    @Param('id') id: string,
    @Param('idMarco') idMarco: string,
  ): Promise<void> {
    return this.client.deletarMarco(token(req), id, idMarco);
  }

  @Get(':id/revisoes')
  async listarRevisoes(
    @Req() req,
    @Param('id') id: string,
  ): Promise<IRevisao[]> {
    return this.client.listarRevisoes(token(req), id);
  }

  @Post(':id/revisoes')
  async revisar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: RevisaoRequest,
  ): Promise<IRevisao> {
    return this.client.revisar(token(req), id, request);
  }
}

function token(req: any): string {
  return req.headers['authorization'].replace('Bearer ', '');
}
