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
import { LivroNotaService } from './livro.nota.service';
import { LivroNoteRequest } from './request/livro.request';
import { Nota, NotaPage } from './model/nota.model';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/livros')
export class LivroNotaController {
  constructor(private readonly service: LivroNotaService) {}

  @Get('/:idLivro/notes')
  async buscarNotas(
    @Req() req,
    @Param('idLivro') idLivro: number,
  ): Promise<NotaPage> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarNotas(token, idLivro);
  }

  @Post('/:idLivro/notes')
  async criar(
    @Req() req,
    @Param('idLivro') idLivro: number,
    @Body() request: LivroNoteRequest,
  ): Promise<Nota> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, idLivro, request);
  }

  @Get('/notes-random')
  async buscarRandom(@Req() req): Promise<Nota[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarRandom(token);
  }

  @Put('/:idLivro/notes/:id')
  async atualizar(
    @Req() req,
    @Param('idLivro') idLivro: number,
    @Param('id') id: string,
    @Body() request: LivroNoteRequest,
  ): Promise<Nota> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, idLivro, id, request);
  }

  @Delete('/:idLivro/notes/:id')
  async deletar(
    @Req() req,
    @Param('idLivro') idLivro: number,
    @Param('id') id: string,
  ): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, idLivro, id);
  }
}
