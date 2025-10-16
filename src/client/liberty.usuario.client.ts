import { HttpException, Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/provider/request/request.service';
import { AcessoModel } from 'src/usuario/model/acesso.model';
import { AcessoRequest } from 'src/usuario/request/acesso.request';
import { UsuarioRequest } from 'src/usuario/request/usuario.request';

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
      this.logger.error(`Erro ao criar usuario: ${error.message}`);
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
      this.logger.error(`Erro ao realizar login: ${error.message}`);
      throw new HttpException(
        error.reponse?.data || 'Erro ao realizar login',
        error.response?.status || 500,
      );
    }
  }
}
