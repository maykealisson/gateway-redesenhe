import { HttpException, Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/provider/request/request.service';
import { AcessoModel, UsuarioInfoModel } from 'src/usuario/model/usuario.model';
import { AcessoRequest } from 'src/usuario/request/acesso.request';
import {
  UsuarioRequest,
  UsuarioUpdateEmailRequest,
  UsuarioUpdateSenhaRequest,
} from 'src/usuario/request/usuario.request';

@Injectable()
export class LibertyUsuarioClient {
  private baseURL = process.env.URL_LIBERTY;

  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyUsuarioClient.name);

  public async criarUsuario(body: UsuarioRequest): Promise<AcessoModel> {
    try {
      const response = await this.requestServer.post<AcessoModel>(
        this.baseURL + '/v1/usuarios',
        body,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao criar usuario: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao criar usuario',
        error?.status || 500,
      );
    }
  }

  public async login(body: AcessoRequest): Promise<AcessoModel> {
    try {
      const response = await this.requestServer.post<AcessoModel>(
        this.baseURL + '/v1/auths/login',
        body,
      );
      return response;
    } catch (error) {
      this.logger.error(`Erro ao realizar login: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao realizar login',
        error?.status || 500,
      );
    }
  }

  public async buscarInfo(token: string): Promise<UsuarioInfoModel> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.get<UsuarioInfoModel>(
        this.baseURL + '/v1/usuarios',
        headers,
      );
      return response;
    } catch (error) {
      this.logger.error(
        `Erro ao buscar info usuario: ${JSON.stringify(error)}`,
      );
      throw new HttpException(
        error?.message || 'Erro ao buscar info usuario',
        error?.status || 500,
      );
    }
  }

  public async updateEmail(
    body: UsuarioUpdateEmailRequest,
    token: string,
  ): Promise<void> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<AcessoModel>(
        this.baseURL + '/v1/usuarios/email',
        body,
        headers,
      );
      return;
    } catch (error) {
      this.logger.error(`Erro ao atualizar email: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao atualizar email',
        error?.status || 500,
      );
    }
  }

  public async updateSenha(
    body: UsuarioUpdateSenhaRequest,
    token: string,
  ): Promise<void> {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await this.requestServer.post<AcessoModel>(
        this.baseURL + '/v1/usuarios/senha',
        body,
        headers,
      );
      return;
    } catch (error) {
      this.logger.error(`Erro ao atualizar senha: ${JSON.stringify(error)}`);
      throw new HttpException(
        error?.message || 'Erro ao atualizar senha',
        error?.status || 500,
      );
    }
  }
}
