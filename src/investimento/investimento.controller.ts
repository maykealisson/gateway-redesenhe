import type { FastifyReply } from 'fastify';
import { Throttle } from '@nestjs/throttler';
import { IConsolidacaoCarteira } from './model/consolidacao.model';
import {
  Controller,
  Header,
  HttpCode,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Req,
  Res,
  Query,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { InvestimentoService } from './investimento.service';
import {
  InvestimentoRequest,
  InvestimentoUpdateRequest,
} from './request/investimento.request';
import {
  ICarteira,
  IExtrato,
  IInvestimento,
  IInvestimentoItem,
  INoticiasResponse,
} from './model/investimento.model';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/investimentos')
export class InvestimentoController {
  constructor(private readonly service: InvestimentoService) {}

  @Post()
  async criar(
    @Req() req,
    @Body() request: InvestimentoRequest,
  ): Promise<IInvestimentoItem> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, request);
  }

  @Get()
  async buscarTodos(
    @Req() req,
    @Query() queryParams: { page?: number },
  ): Promise<IInvestimento> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodos(token, queryParams?.page);
  }

  @Get('segmento/:segmento')
  async buscarFinalizados(
    @Req() req,
    @Param('segmento') segmento: string,
    @Query() queryParams: { page?: number },
  ): Promise<IInvestimento> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarPorSegmento(token, segmento, queryParams?.page);
  }

  @Get('/carteira')
  async buscarCarteira(@Req() req): Promise<ICarteira> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarCarteira(token);
  }

  @Get('/consolida-carteira')
  async consolidaCarteira(@Req() req): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.consolidar(token);
  }

  @Post('/consolida-carteira')
  @HttpCode(202)
  @Header('Cache-Control', 'no-store')
  @Header('Retry-After', '3')
  async iniciarConsolidacao(@Req() req): Promise<IConsolidacaoCarteira> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.iniciarConsolidacao(token);
  }

  @Get('/consolida-carteira/status')
  @Header('Cache-Control', 'no-store')
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  async consultarConsolidacao(
    @Req() req,
    @Res({ passthrough: true }) reply: FastifyReply,
  ): Promise<IConsolidacaoCarteira | null> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    const status = await this.service.consultarConsolidacao(token);
    if (!status) reply.code(204);
    return status;
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: InvestimentoUpdateRequest,
  ): Promise<IInvestimentoItem> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, id, request);
  }

  @Delete(':id')
  async deletar(@Req() req, @Param('id') id: string): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, id);
  }

  @Get('/tickets')
  async buscarTickets(@Req() req): Promise<string[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTickets(token);
  }

  @Get('/noticias/:ticket')
  async buscarNoticiasPorTicket(
    @Req() req,
    @Param('ticket') ticket: string,
  ): Promise<INoticiasResponse> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarNoticiasPorTicket(token, ticket);
  }

  @Get('extratos')
  async buscaExtratos(
    @Req() req,
    @Query() queryParams: { page?: number },
  ): Promise<IExtrato> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarExtratos(token, queryParams?.page);
  }
}
