import { Test, TestingModule } from '@nestjs/testing';
import { LibertyUsuarioClient } from './liberty.usuario.client';
import { RequestService } from '../provider/request/request.service';
import { UsuarioRequest } from '../usuario/request/usuario.request';
import { AcessoRequest } from '../usuario/request/acesso.request';
import { AcessoModel } from '../usuario/model/usuario.model';
import { HttpException } from '@nestjs/common';

describe('LibertyUsuarioClient', () => {
  let client: LibertyUsuarioClient;
  let requestService: RequestService;

  const mockRequestService = {
    post: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LibertyUsuarioClient,
        {
          provide: RequestService,
          useValue: mockRequestService,
        },
      ],
    }).compile();

    client = module.get<LibertyUsuarioClient>(LibertyUsuarioClient);
    requestService = module.get<RequestService>(RequestService);
  });

  it('deve estar definido', () => {
    expect(client).toBeDefined();
    expect(requestService).toBeDefined();
  });

  describe('criarUsuario', () => {
    it('deve criar usuário com sucesso', async () => {
      const request: UsuarioRequest = {
        nome: 'Teste',
        email: 'teste@email.com',
        senha: 'senha',
      };
      const response: AcessoModel = {
        token: 'token',
        nome: 'Teste',
        expiracao: '2025-12-31',
      };

      mockRequestService.post.mockResolvedValue(response);

      const result = await client.criarUsuario(request);

      expect(result).toEqual(response);
      expect(requestService.post).toHaveBeenCalledWith(
        expect.stringContaining('/v1/usuarios'),
        request,
      );
    });

    it('deve lançar erro se falhar', async () => {
      const request: UsuarioRequest = {
        nome: 'Teste',
        email: 'teste@email.com',
        senha: 'senha',
      };
      mockRequestService.post.mockRejectedValue(new Error('Erro'));

      await expect(client.criarUsuario(request)).rejects.toThrow(HttpException);
    });
  });

  describe('login', () => {
    it('deve realizar login com sucesso', async () => {
      const request: AcessoRequest = {
        email: 'teste@email.com',
        senha: 'senha',
      };
      const response: AcessoModel = {
        token: 'token',
        nome: 'Teste',
        expiracao: '2025-12-31',
      };

      mockRequestService.post.mockResolvedValue(response);

      const result = await client.login(request);

      expect(result).toEqual(response);
      expect(requestService.post).toHaveBeenCalledWith(
        expect.stringContaining('/v1/auths/login'),
        request,
      );
    });

    it('deve lançar erro se falhar', async () => {
      const request: AcessoRequest = {
        email: 'teste@email.com',
        senha: 'senha',
      };
      mockRequestService.post.mockRejectedValue(new Error('Erro'));

      await expect(client.login(request)).rejects.toThrow(HttpException);
    });
  });
});
