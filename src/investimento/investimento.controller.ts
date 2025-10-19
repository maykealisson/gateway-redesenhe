import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
  Req,
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
  IInvestimento,
  IInvestimentoItem,
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
}
