import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  DefaultValuePipe,
  Param,
  ParseBoolPipe,
  Patch,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { ProventoService } from './provento.service';
import {
  IImportacaoProventos,
  IProvento,
  IProventosResumo,
} from './model/provento.model';
import {
  AlterarTipoRequest,
  ProventoRequest,
} from './request/provento.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/proventos')
export class ProventoController {
  constructor(private readonly service: ProventoService) {}

  @Get('resumo')
  async resumo(
    @Req() req,
    @Query('ano', new ParseIntPipe({ optional: true })) ano?: number,
  ): Promise<IProventosResumo> {
    return this.service.resumo(token(req), ano);
  }

  @Post('importacao')
  async importar(
    @Req() req,
    @Query('meses', new DefaultValuePipe(12), ParseIntPipe) meses: number,
    @Query('confirmar', new DefaultValuePipe(false), ParseBoolPipe)
    confirmar: boolean,
  ): Promise<IImportacaoProventos> {
    return this.service.importar(token(req), meses, confirmar);
  }

  @Patch(':id/tipo')
  async alterarTipo(
    @Req() req,
    @Param('id') id: string,
    @Body() request: AlterarTipoRequest,
  ): Promise<IProvento> {
    return this.service.alterarTipo(token(req), id, request);
  }

  @Post()
  async criar(
    @Req() req,
    @Body() request: ProventoRequest,
  ): Promise<IProvento> {
    return this.service.criar(token(req), request);
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: ProventoRequest,
  ): Promise<IProvento> {
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
