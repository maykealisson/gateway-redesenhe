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
import { InvestimentoNotaRequest } from './request/investimento.request';
import { IAtivoNota, IAtivoNotaItem } from './model/investimento.model';
import { InvestimentoNotaService } from './investimento.nota.service';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/investimentos')
export class InvestimentoNotaController {
  constructor(private readonly service: InvestimentoNotaService) {}

  @Post('/:idInvestimento/notas')
  async criar(
    @Req() req,
    @Param('idInvestimento') idInvestimento: number,
    @Body() request: InvestimentoNotaRequest,
  ): Promise<IAtivoNotaItem> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, idInvestimento, request);
  }

  @Get('/:idInvestimento/notas')
  async buscarTodos(
    @Req() req,
    @Param('idInvestimento') idInvestimento: number,
    @Query() queryParams: { page?: number },
  ): Promise<IAtivoNota> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodos(token, idInvestimento, queryParams?.page);
  }

  @Delete('/:idInvestimento/notas/:id')
  async deletar(
    @Req() req,
    @Param('idInvestimento') idInvestimento: number,
    @Param('id') id: number,
  ): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, idInvestimento, id);
  }
}
