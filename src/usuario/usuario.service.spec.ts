import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { LibertyUsuarioClient } from '../client/liberty.usuario.client';
import { UsuarioRequest } from './request/usuario.request';
import { AcessoRequest } from './request/acesso.request';
import { AcessoModel } from './model/usuario.model';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let clientLiberty: LibertyUsuarioClient;

  const mockLibertyUsuarioClient = {
    criarUsuario: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        {
          provide: LibertyUsuarioClient,
          useValue: mockLibertyUsuarioClient,
        },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    clientLiberty = module.get<LibertyUsuarioClient>(LibertyUsuarioClient);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(clientLiberty).toBeDefined();
  });

  describe('criar', () => {
    it('deve criar um usuário com sucesso', async () => {
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

      mockLibertyUsuarioClient.criarUsuario.mockResolvedValue(response);

      const result = await service.criar(request);

      expect(result).toEqual(response);
      expect(clientLiberty.criarUsuario).toHaveBeenCalledWith(request);
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

      mockLibertyUsuarioClient.login.mockResolvedValue(response);

      const result = await service.login(request);

      expect(result).toEqual(response);
      expect(clientLiberty.login).toHaveBeenCalledWith(request);
    });
  });
});
