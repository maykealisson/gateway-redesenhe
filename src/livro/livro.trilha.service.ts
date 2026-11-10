import { HttpException, Injectable, Logger } from '@nestjs/common';
import { LibertyLivroClient } from 'src/client/liberty.livro.client';
import { Trilha } from './model/trilha.model';
import { TrilhaRequest } from './request/trilha.request';

@Injectable()
export class LivroTrilhaService {
  private readonly logger = new Logger(LivroTrilhaService.name);

  constructor(private readonly clientLivro: LibertyLivroClient) {}

  async buscarTodas(token: string): Promise<Trilha[]> {
    this.logger.log('Buscando trilhas de leitura');
    return await this.clientLivro.buscarTrilhas(token);
  }

  async buscarPorId(token: string, id: string): Promise<Trilha> {
    this.logger.log(`Buscando trilha de leitura: ${id}`);
    return await this.clientLivro.buscarTrilha(token, id);
  }

  async criar(token: string, request: TrilhaRequest): Promise<Trilha> {
    this.logger.log(`Criando trilha de leitura: ${request.nome}`);
    return await this.clientLivro.criarTrilha(token, request);
  }

  async atualizar(
    token: string,
    id: string,
    request: TrilhaRequest,
  ): Promise<Trilha> {
    this.logger.log(`Atualizando trilha de leitura: ${id}`);
    return await this.clientLivro.atualizarTrilha(token, id, request);
  }

  async deletar(token: string, id: string): Promise<any> {
    this.logger.log(`Deletando trilha de leitura: ${id}`);
    return await this.clientLivro.deletarTrilha(token, id);
  }

  async gerar(token: string, tema: string): Promise<Trilha> {
    if (!tema || !tema.trim()) {
      throw new HttpException('Tema da trilha é obrigatório', 400);
    }
    this.logger.log(`Gerando trilha de leitura: ${tema}`);
    return await this.clientLivro.gerarTrilha(token, tema.trim());
  }
}
