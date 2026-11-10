import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { LivroTrilhaService } from './livro.trilha.service';
import { Trilha } from './model/trilha.model';
import { TrilhaRequest } from './request/trilha.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/livros/trilhas')
export class LivroTrilhaController {
  constructor(private readonly service: LivroTrilhaService) {}

  @Get()
  async buscarTodas(@Req() req): Promise<Trilha[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodas(token);
  }

  @Post('gerar')
  async gerar(
    @Req() req,
    @Query() queryParams: { tema: string },
  ): Promise<Trilha> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.gerar(token, queryParams?.tema);
  }

  @Get(':id')
  async buscarPorId(@Req() req, @Param('id') id: string): Promise<Trilha> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarPorId(token, id);
  }

  @Post()
  async criar(@Req() req, @Body() request: TrilhaRequest): Promise<Trilha> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, request);
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: TrilhaRequest,
  ): Promise<Trilha> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, id, request);
  }

  @Delete(':id')
  async deletar(@Req() req, @Param('id') id: string): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, id);
  }
}
