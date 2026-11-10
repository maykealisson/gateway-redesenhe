import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseFloatPipe,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { CarteiraService } from './carteira.service';
import {
  IAlocacaoAlvo,
  IBenchmarks,
  IRebalanceamento,
} from './model/carteira.model';
import { AlocacaoAlvoRequest } from './request/alocacao-alvo.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/carteira')
export class CarteiraController {
  constructor(private readonly service: CarteiraService) {}

  @Get('alocacao-alvo')
  async buscarAlocacaoAlvo(@Req() req): Promise<IAlocacaoAlvo[]> {
    return this.service.buscarAlocacaoAlvo(token(req));
  }

  @Put('alocacao-alvo')
  async salvarAlocacaoAlvo(
    @Req() req,
    @Body() request: AlocacaoAlvoRequest,
  ): Promise<IAlocacaoAlvo[]> {
    return this.service.salvarAlocacaoAlvo(token(req), request);
  }

  @Get('rebalanceamento')
  async rebalancear(
    @Req() req,
    @Query('aporte', new DefaultValuePipe(0), ParseFloatPipe) aporte: number,
  ): Promise<IRebalanceamento> {
    return this.service.rebalancear(token(req), aporte);
  }

  @Get('benchmarks')
  async benchmarks(
    @Req() req,
    @Query('inicio') inicio?: string,
  ): Promise<IBenchmarks> {
    if (inicio && !/^\d{4}-\d{2}-\d{2}$/.test(inicio)) {
      throw new BadRequestException('inicio deve estar no formato yyyy-MM-dd');
    }
    return this.service.benchmarks(token(req), inicio);
  }
}

function token(req: any): string {
  return req.headers['authorization'].replace('Bearer ', '');
}
