import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Delete,
  Req,
  Query,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { InvestimentoLancamentoRequest } from './request/investimento.request';
import { ILancamento, ILancamentoItem } from './model/investimento.model';
import { InvestimentoLancamentoService } from './investimento.lancamento.service';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/investimentos')
export class InvestimentoLancamentoController {
  constructor(private readonly service: InvestimentoLancamentoService) {}

  @Post('/:idLancamento/lancamentos')
  async criar(
    @Req() req,
    @Param('idLancamento') idLancamento: number,
    @Body() request: InvestimentoLancamentoRequest,
  ): Promise<ILancamentoItem> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, idLancamento, request);
  }

  @Get('/:idLancamento/lancamentos')
  async buscarTodos(
    @Req() req,
    @Param('idLancamento') idLancamento: number,
    @Query() queryParams: { page?: number },
  ): Promise<ILancamento> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodos(token, idLancamento, queryParams?.page);
  }

  @Delete('/:idLancamento/lancamentos/:id')
  async deletar(
    @Req() req,
    @Param('idLancamento') idLancamento: number,
    @Param('id') id: number,
  ): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, idLancamento, id);
  }
}
