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
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { MetaService } from './meta.service';
import { Meta } from './model/meta.model';
import { MetaRequest } from './request/meta.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/metas')
export class MetaController {
  constructor(private readonly service: MetaService) {}

  @Get()
  async buscarTodas(@Req() req): Promise<Meta[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodas(token);
  }

  @Post()
  async criar(@Req() req, @Body() request: MetaRequest): Promise<Meta> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, request);
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: MetaRequest,
  ): Promise<Meta> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, id, request);
  }

  @Delete(':id')
  async deletar(@Req() req, @Param('id') id: string): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, id);
  }
}
