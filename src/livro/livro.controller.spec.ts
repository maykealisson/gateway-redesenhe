import { Test, TestingModule } from '@nestjs/testing';
import { LivroController } from './livro.controller';
import { LivroService } from './livro.service';
import { LivroRequest, LivroUpdateRequest } from './request/livro.request';
import { GoogleLivro } from './model/livro.google.model';
import { Livro, LivroPage } from './model/livro.model';
import { Sumario } from './model/sumario.model';
import { AuthorizationHeaderGuard } from '../auth/guards/authorization-header.guard';
import { ExecutionContext } from '@nestjs/common';

describe('LivroController', () => {
  let controller: LivroController;
  let service: LivroService;

  const mockLivroService = {
    buscarNoGoogle: jest.fn(),
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarFinalizados: jest.fn(),
    buscarFinalizadosAno: jest.fn(),
    buscarPlanoLeitura: jest.fn(),
    buscarResumo: jest.fn(),
    buscarNaBiblioteca: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  };

  const mockAuthorizationHeaderGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  const mockRequest = {
    headers: {
      authorization: 'Bearer valid_token',
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivroController],
      providers: [
        {
          provide: LivroService,
          useValue: mockLivroService,
        },
      ],
    })
      .overrideGuard(AuthorizationHeaderGuard)
      .useValue(mockAuthorizationHeaderGuard)
      .compile();

    controller = module.get<LivroController>(LivroController);
    service = module.get<LivroService>(LivroService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('buscarNoGoogle', () => {
    it('deve buscar no google', async () => {
      const response: GoogleLivro[] = [];
      mockLivroService.buscarNoGoogle.mockResolvedValue(response);

      const result = await controller.buscarNoGoogle(mockRequest, { name: 'Teste' });

      expect(result).toEqual(response);
      expect(service.buscarNoGoogle).toHaveBeenCalledWith('valid_token', 'Teste', undefined);
    });
  });

  describe('criar', () => {
    it('deve criar livro', async () => {
      const request: LivroRequest = {
        name: 'Teste',
        author: 'Autor',
        description: 'Desc',
        pages: 100,
        image_link: 'link',
      };
      const response: Livro = { id: 1 } as Livro;
      mockLivroService.criar.mockResolvedValue(response);

      const result = await controller.criar(mockRequest, request);

      expect(result).toEqual(response);
      expect(service.criar).toHaveBeenCalledWith('valid_token', request);
    });
  });

  describe('buscarTodos', () => {
    it('deve buscar todos', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLivroService.buscarTodos.mockResolvedValue(response);

      const result = await controller.buscarTodos(mockRequest, { page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarTodos).toHaveBeenCalledWith('valid_token', 1);
    });
  });

  describe('buscarFinalizados', () => {
    it('deve buscar finalizados', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLivroService.buscarFinalizados.mockResolvedValue(response);

      const result = await controller.buscarFinalizados(mockRequest, { page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarFinalizados).toHaveBeenCalledWith('valid_token', 1);
    });
  });

  describe('buscarFinalizadoAno', () => {
    it('deve buscar finalizados ano', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLivroService.buscarFinalizadosAno.mockResolvedValue(response);

      const result = await controller.buscarFinalizadoAno(mockRequest, { page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarFinalizadosAno).toHaveBeenCalledWith('valid_token', 1);
    });
  });

  describe('buscaPlanoLeitura', () => {
    it('deve buscar plano leitura', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLivroService.buscarPlanoLeitura.mockResolvedValue(response);

      const result = await controller.buscaPlanoLeitura(mockRequest, { ano: '2025', page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarPlanoLeitura).toHaveBeenCalledWith('valid_token', '2025', 1);
    });
  });

  describe('buscaResumo', () => {
    it('deve buscar resumo', async () => {
      const response: Sumario = { total_lido: 10, total_lido_ano: 1, total_paginas: 1000 };
      mockLivroService.buscarResumo.mockResolvedValue(response);

      const result = await controller.buscaResumo(mockRequest);

      expect(result).toEqual(response);
      expect(service.buscarResumo).toHaveBeenCalledWith('valid_token');
    });
  });

  describe('buscaBiblioteca', () => {
    it('deve buscar biblioteca', async () => {
      const response: Livro[] = [];
      mockLivroService.buscarNaBiblioteca.mockResolvedValue(response);

      const result = await controller.buscaBiblioteca(mockRequest, { name: 'Teste' });

      expect(result).toEqual(response);
      expect(service.buscarNaBiblioteca).toHaveBeenCalledWith('valid_token', 'Teste');
    });
  });

  describe('atualizar', () => {
    it('deve atualizar', async () => {
      const id = '1';
      const request: LivroUpdateRequest = {} as LivroUpdateRequest;
      const response: Livro = { id: 1 } as Livro;
      mockLivroService.atualizar.mockResolvedValue(response);

      const result = await controller.atualizar(mockRequest, id, request);

      expect(result).toEqual(response);
      expect(service.atualizar).toHaveBeenCalledWith('valid_token', id, request);
    });
  });

  describe('deletar', () => {
    it('deve deletar', async () => {
      const id = '1';
      mockLivroService.deletar.mockResolvedValue({ status: 'ok' });

      const result = await controller.deletar(mockRequest, id);

      expect(result).toEqual({ status: 'ok' });
      expect(service.deletar).toHaveBeenCalledWith('valid_token', id);
    });
  });
});
