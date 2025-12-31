import { HttpException, Injectable, Logger } from '@nestjs/common';
import { Nota, NotaPage } from 'src/livro/model/nota.model';
import { LivroNoteRequest } from 'src/livro/request/livro.request';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyLivroNotaClient {
  private baseURL = process.env.URL_LIBERTY;

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyLivroNotaClient.name);

  public async criar(
    token: string,
    idLivro: number,
    body: LivroNoteRequest,
  ): Promise<Nota> {
    try {
      var path = '/v1/livros/' + idLivro + '/notes';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<Nota>(
        this.baseURL + path,
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar nota: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao criar nota',
        error.response?.status || 500,
      );
    }
  }

  public async buscarPorLivro(
    token: string,
    idLivro: number,
    pagina?: number,
  ): Promise<NotaPage> {
    try {
      var path = '/v1/livros/' + idLivro + '/notes';
      if (pagina) {
        path += '?page=' + pagina;
      }
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<NotaPage>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao buscar nota: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao buscar nota',
        error?.status || 500,
      );
    }
  }

  public async buscarRandom(token: string): Promise<Nota> {
    try {
      var path = '/v1/livros/nota-do-dia';
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<Nota>(
        this.baseURL + path,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar notas random : ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar notas random',
        error?.status || 500,
      );
    }
  }

  public async atualizar(
    token: string,
    idLivro: number,
    id: string,
    body: LivroNoteRequest,
  ): Promise<Nota> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.put<Nota>(
        this.baseURL + '/v1/livros/' + idLivro + '/notes/' + id,
        body,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao atualizar nota: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao atualizar nota',
        error.response?.status || 500,
      );
    }
  }

  public async deletar(
    token: string,
    idLivro: number,
    id: string,
  ): Promise<any> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.delete<any>(
        this.baseURL + '/v1/livros/' + idLivro + '/notes/' + id,
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao deletar nota: ${JSON.stringify(error)}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao deletar nota',
        error.response?.status || 500,
      );
    }
  }
}
