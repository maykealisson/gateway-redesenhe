import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Query,
  Put,
  Delete,
  Req,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { GoogleLivro } from './model/livro.google.model';
import { Livro, LivroPage } from './model/livro.model';
import { Sumario } from './model/sumario.model';
import { LivroService } from './livro.service';
import { LivroRequest, LivroUpdateRequest } from './request/livro.request';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/livros')
export class LivroController {
  constructor(private readonly service: LivroService) {}

  @Get('/buscar-google')
  async buscarNoGoogle(
    @Req() req,
    @Query() queryParams: { name: string; author?: string },
  ): Promise<GoogleLivro[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarNoGoogle(
      token,
      queryParams.name,
      queryParams?.author,
    );
  }

  @Post()
  async criar(@Req() req, @Body() request: LivroRequest): Promise<Livro> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.criar(token, request);
  }

  @Get()
  async buscarTodos(
    @Req() req,
    @Query() queryParams: { page?: number },
  ): Promise<LivroPage> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarTodos(token, queryParams?.page);
  }

  @Get('finalizados')
  async buscarFinalizados(
    @Req() req,
    @Query() queryParams: { page?: number },
  ): Promise<LivroPage> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarFinalizados(token, queryParams?.page);
  }

  @Get('finalizado-ano')
  async buscarFinalizadoAno(
    @Req() req,
    @Query() queryParams: { page?: number },
  ): Promise<LivroPage> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarFinalizadosAno(token, queryParams?.page);
  }

  @Get('plano-leitura')
  async buscaPlanoLeitura(
    @Req() req,
    @Query() queryParams: { ano?: string; page?: number },
  ): Promise<LivroPage> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarPlanoLeitura(
      token,
      queryParams?.ano,
      queryParams?.page,
    );
  }

  @Get('resumo')
  async buscaResumo(@Req() req): Promise<Sumario> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarResumo(token);
  }

  @Get('buscar-biblioteca')
  async buscaBiblioteca(
    @Req() req,
    @Query() queryParams: { name: string },
  ): Promise<Livro[]> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.buscarNaBiblioteca(token, queryParams.name);
  }

  @Put(':id')
  async atualizar(
    @Req() req,
    @Param('id') id: string,
    @Body() request: LivroUpdateRequest,
  ): Promise<Livro> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.atualizar(token, id, request);
  }

  @Delete(':id')
  async deletar(@Req() req, @Param('id') id: string): Promise<any> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.deletar(token, id);
  }
}
