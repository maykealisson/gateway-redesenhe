import { HttpException, Injectable, Logger } from '@nestjs/common';
import { LivroNoteRequest } from './request/livro.request';
import { LibertyLivroNotaClient } from 'src/client/liberty.livro.nota.client';
import { Nota, NotaPage } from './model/nota.model';

@Injectable()
export class LivroNotaService {
  private readonly logger = new Logger(LivroNotaService.name);

  constructor(private readonly clientLivroNota: LibertyLivroNotaClient) {}

  async buscarNotas(token: string, idLivro: number): Promise<NotaPage> {
    if (!idLivro) {
      throw new HttpException('Id do livro é obrigatório', 400);
    }
    this.logger.log(`Buscando nota do livro: ${idLivro}`);
    return await this.clientLivroNota.buscarPorLivro(token, idLivro);
  }

  async criar(
    token: string,
    idLivro: number,
    request: LivroNoteRequest,
  ): Promise<Nota> {
    this.logger.log(`Criando nota para livro: ${idLivro}`);
    return await this.clientLivroNota.criar(token, idLivro, request);
  }

  async buscarRandom(token: string): Promise<Nota> {
    this.logger.log(`Buscando nota do dia`);
    return await this.clientLivroNota.buscarRandom(token);
  }

  async atualizar(
    token: string,
    idLivro: number,
    id: string,
    request: LivroNoteRequest,
  ): Promise<Nota> {
    this.logger.log(`Atualizando nota: ${id}}`);
    return await this.clientLivroNota.atualizar(token, idLivro, id, request);
  }

  async deletar(token: string, idLivro: number, id: string): Promise<any> {
    this.logger.log(`Deletando nota: ${idLivro}}`);
    return await this.clientLivroNota.deletar(token, idLivro, id);
  }
}
