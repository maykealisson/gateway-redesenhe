import { HttpException, Injectable, Logger } from '@nestjs/common';
import { GoogleLivro } from 'src/livro/model/livro.google.model';
import { Livro, LivroPage } from 'src/livro/model/livro.model';
import { Recomendacao } from 'src/livro/model/recomendacao.model';
import { Trilha } from 'src/livro/model/trilha.model';
import { TrilhaRequest } from 'src/livro/request/trilha.request';
import { Sumario } from 'src/livro/model/sumario.model';
import { LivroUpdateRequest } from 'src/livro/request/livro.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyLivroClient {
  private baseURL = process.env.URL_LIBERTY;

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyLivroClient.name);

  public async buscarNoGoogle(
    token: string,
    nome: string,
    autor?: string,
  ): Promise<GoogleLivro[]> {
    try {
      var path = '/v1/livros/buscar-google?name=' + nome;
      if (autor) {
        path += '&author=' + autor;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<GoogleLivro[]>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar livro google: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar livro google',
        error?.status || 500,
      );
    }
  }

  public async criar(token: string, body: GoogleLivro): Promise<Livro> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<Livro>(
        this.baseURL + '/v1/livros',
        body,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(`Erro ao criar livro: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao criar livro',
        error?.status || 500,
      );
    }
  }

  public async buscarTodos(token: string, pagina?: number): Promise<LivroPage> {
    try {
      var path = '/v1/livros';
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<LivroPage>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(`Erro ao buscar livro: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar livro',
        error?.status || 500,
      );
    }
  }

  public async buscarFinalizados(
    token: string,
    pagina?: number,
  ): Promise<LivroPage> {
    try {
      var path = '/v1/livros/finalizados';
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<LivroPage>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar livro finalizados: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar livro finalizados',
        error?.status || 500,
      );
    }
  }

  public async buscarFinalizadosAno(
    token: string,
    pagina?: number,
  ): Promise<LivroPage> {
    try {
      var path = '/v1/livros/finalizados';
      if (pagina) {
        path += '?page=' + pagina;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<LivroPage>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar livro finalizados: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar livro finalizados',
        error?.status || 500,
      );
    }
  }

  public async planoLeitura(
    token: string,
    ano?: string,
    pagina?: number,
  ): Promise<LivroPage> {
    try {
      var path = '/v1/livros/plano-leitura';
      if (pagina) {
        path += '?page=' + pagina;
      }
      if (ano) {
        path += (pagina ? '&' : '?') + 'ano=' + ano;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<LivroPage>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar plano leitura: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar plano leitura',
        error?.status || 500,
      );
    }
  }

  public async resumo(token: string): Promise<Sumario> {
    try {
      var path = '/v1/livros/resumo';

      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<Sumario>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar resumo leitura: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar resumo leitura',
        error?.status || 500,
      );
    }
  }

  public async buscarBiblioteca(token: string, nome: string): Promise<Livro[]> {
    try {
      var path = '/v1/livros/buscar-biblioteca?name=' + nome;
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<Livro[]>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(
        `Erro ao buscar livro biblioteca: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar livro biblioteca',
        error?.status || 500,
      );
    }
  }

  public async atualizar(
    token: string,
    id: string,
    body: LivroUpdateRequest,
  ): Promise<Livro> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.put<Livro>(
        this.baseURL + '/v1/livros/' + id,
        body,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(`Erro ao atualizar livro: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao atualizar livro',
        error?.status || 500,
      );
    }
  }

  public async deletar(token: string, id: string): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.delete<any>(
        this.baseURL + '/v1/livros/' + id,
        headers,
      );
      return response;
    } catch (error: any) {
      this.logger.error(`Erro ao deletar livro: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao deletar livro',
        error?.status || 500,
      );
    }
  }

  private headers(token: string) {
    return { Authorization: `Bearer ${token}` };
  }

  private erro(mensagem: string, error: any): HttpException {
    this.logger.error(`${mensagem}: ${JSON.stringify(error)}`);
    return new HttpException(error?.message || mensagem, error?.status || 500);
  }

  public async recomendacoes(
    token: string,
    tema?: string,
  ): Promise<Recomendacao[]> {
    try {
      let path = '/v1/livros/recomendacoes';
      if (tema) {
        path += '?tema=' + encodeURIComponent(tema);
      }
      return await this.requestServer.get<Recomendacao[]>(
        this.baseURL + path,
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao buscar recomendações de livros', error);
    }
  }

  public async buscarTrilhas(token: string): Promise<Trilha[]> {
    try {
      return await this.requestServer.get<Trilha[]>(
        this.baseURL + '/v1/livros/trilhas',
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao buscar trilhas de leitura', error);
    }
  }

  public async buscarTrilha(token: string, id: string): Promise<Trilha> {
    try {
      return await this.requestServer.get<Trilha>(
        this.baseURL + '/v1/livros/trilhas/' + id,
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao buscar trilha de leitura', error);
    }
  }

  public async criarTrilha(
    token: string,
    body: TrilhaRequest,
  ): Promise<Trilha> {
    try {
      return await this.requestServer.post<Trilha>(
        this.baseURL + '/v1/livros/trilhas',
        body,
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao criar trilha de leitura', error);
    }
  }

  public async atualizarTrilha(
    token: string,
    id: string,
    body: TrilhaRequest,
  ): Promise<Trilha> {
    try {
      return await this.requestServer.put<Trilha>(
        this.baseURL + '/v1/livros/trilhas/' + id,
        body,
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao atualizar trilha de leitura', error);
    }
  }

  public async deletarTrilha(token: string, id: string): Promise<any> {
    try {
      return await this.requestServer.delete<any>(
        this.baseURL + '/v1/livros/trilhas/' + id,
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao deletar trilha de leitura', error);
    }
  }

  public async gerarTrilha(token: string, tema: string): Promise<Trilha> {
    try {
      return await this.requestServer.post<Trilha>(
        this.baseURL +
          '/v1/livros/trilhas/gerar?tema=' +
          encodeURIComponent(tema),
        {},
        this.headers(token),
      );
    } catch (error: any) {
      throw this.erro('Erro ao gerar trilha de leitura', error);
    }
  }
}
