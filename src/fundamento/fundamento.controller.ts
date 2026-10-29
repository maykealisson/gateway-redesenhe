import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseFloatPipe,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { FundamentoService } from './fundamento.service';
import {
  IAnaliseResumo,
  IAnaliseUpload,
  IRelatorioAnalise,
} from './model/fundamento.model';
import { AnaliseRequest } from './request/analise.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/fundamentos')
export class FundamentoController {
  constructor(private readonly service: FundamentoService) {}

  @Post(':ticker/analises')
  async enviarAnalise(
    @Param('ticker') ticker: string,
    @Body() request: AnaliseRequest,
  ): Promise<IAnaliseUpload> {
    return this.service.enviarAnalise(ticker, request);
  }

  @Get(':ticker/analises')
  async listarAnalises(
    @Param('ticker') ticker: string,
  ): Promise<IAnaliseResumo[]> {
    return this.service.listarAnalises(ticker);
  }

  @Get(':ticker/relatorio')
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  async gerarRelatorio(
    @Param('ticker') ticker: string,
    @Query('margem_desejada', new ParseFloatPipe({ optional: true }))
    margemDesejada?: number,
  ): Promise<IRelatorioAnalise> {
    return this.service.gerarRelatorio(ticker, margemDesejada);
  }

  @Delete('analises/:id')
  @HttpCode(204)
  async removerAnalise(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.service.removerAnalise(id);
  }
}
