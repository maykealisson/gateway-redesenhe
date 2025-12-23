import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioRequest } from './request/usuario.request';
import { AcessoRequest } from './request/acesso.request';
import { AcessoModel } from './model/usuario.model';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: UsuarioService;

  const mockUsuarioService = {
    criar: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        {
          provide: UsuarioService,
          useValue: mockUsuarioService,
        },
      ],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
    service = module.get<UsuarioService>(UsuarioService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createUsuario', () => {
    it('deve chamar service.criar com os parâmetros corretos', async () => {
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

      mockUsuarioService.criar.mockResolvedValue(response);

      const result = await controller.createUsuario(request);

      expect(result).toEqual(response);
      expect(service.criar).toHaveBeenCalledWith(request);
    });
  });

  describe('login', () => {
    it('deve chamar service.login com os parâmetros corretos', async () => {
      const request: AcessoRequest = {
        email: 'teste@email.com',
        senha: 'senha',
      };
      const response: AcessoModel = {
        token: 'token',
        nome: 'Teste',
        expiracao: '2025-12-31',
      };

      mockUsuarioService.login.mockResolvedValue(response);

      const result = await controller.login(request);

      expect(result).toEqual(response);
      expect(service.login).toHaveBeenCalledWith(request);
    });
  });
});
