import { HttpException, Injectable, Logger } from '@nestjs/common';
import { LibertyLivroClient } from 'src/client/liberty.livro.client';
import { GoogleLivro } from './model/livro.google.model';
import { Livro, LivroPage } from './model/livro.model';
import { Sumario } from './model/sumario.model';
import { LivroUpdateRequest } from './request/livro.request';

@Injectable()
export class LivroService {
  private readonly logger = new Logger(LivroService.name);

  constructor(private readonly clientLivro: LibertyLivroClient) {}

  async buscarNoGoogle(
    token: string,
    nome: string,
    author?: string,
  ): Promise<GoogleLivro[]> {
    if (!nome) {
      throw new HttpException('Nome do livro é obrigatório', 400);
    }
    this.logger.log(`Buscando livro google: ${nome}- ${author}`);
    return await this.clientLivro.buscarNoGoogle(token, nome, author);
  }

  async criar(token: string, request: GoogleLivro): Promise<Livro> {
    this.logger.log(
      `Criando livro: ${JSON.stringify(request.name)}- ${JSON.stringify(request.author)}`,
    );
    return await this.clientLivro.criar(token, request);
  }

  async buscarTodos(token: string, pagina?: number): Promise<LivroPage> {
    this.logger.log(`Buscando livros: ${pagina}}`);
    return await this.clientLivro.buscarTodos(token, pagina);
  }

  async buscarFinalizados(token: string, pagina?: number): Promise<LivroPage> {
    this.logger.log(`Buscando livros finalizados: ${pagina}}`);
    return await this.clientLivro.buscarFinalizados(token, pagina);
  }

  async buscarFinalizadosAno(
    token: string,
    pagina?: number,
  ): Promise<LivroPage> {
    this.logger.log(`Buscando livros finalizados no ano: ${pagina}}`);
    return await this.clientLivro.buscarFinalizadosAno(token, pagina);
  }

  async buscarPlanoLeitura(
    token: string,
    ano?: string,
    pagina?: number,
  ): Promise<LivroPage> {
    this.logger.log(`Buscando plano leitura: ${ano} - ${pagina}}`);
    return await this.clientLivro.planoLeitura(token, ano, pagina);
  }

  async buscarResumo(token: string): Promise<Sumario> {
    this.logger.log(`Buscando resumo}`);
    return await this.clientLivro.resumo(token);
  }

  async buscarNaBiblioteca(token: string, nome: string): Promise<Livro[]> {
    if (!nome) {
      throw new HttpException('Nome do livro é obrigatório', 400);
    }
    this.logger.log(`Buscando livro biblioteca: ${nome}}`);
    return await this.clientLivro.buscarBiblioteca(token, nome);
  }

  async atualizar(
    token: string,
    id: string,
    request: LivroUpdateRequest,
  ): Promise<Livro> {
    this.logger.log(`Atualizando livro: ${id}}`);
    return await this.clientLivro.atualizar(token, id, request);
  }

  async deletar(token: string, id: string): Promise<any> {
    this.logger.log(`Deletando livro: ${id}}`);
    return await this.clientLivro.deletar(token, id);
  }
}
