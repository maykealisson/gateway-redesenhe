import { Test, TestingModule } from '@nestjs/testing';
import { LivroService } from './livro.service';
import { LibertyLivroClient } from '../client/liberty.livro.client';
import { GoogleLivro } from './model/livro.google.model';
import { Livro, LivroPage } from './model/livro.model';
import { Sumario } from './model/sumario.model';
import { LivroUpdateRequest } from './request/livro.request';
import { HttpException } from '@nestjs/common';

describe('LivroService', () => {
  let service: LivroService;
  let client: LibertyLivroClient;

  const mockLibertyLivroClient = {
    buscarNoGoogle: jest.fn(),
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarFinalizados: jest.fn(),
    buscarFinalizadosAno: jest.fn(),
    planoLeitura: jest.fn(),
    resumo: jest.fn(),
    buscarBiblioteca: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  };

  const token = 'valid_token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivroService,
        {
          provide: LibertyLivroClient,
          useValue: mockLibertyLivroClient,
        },
      ],
    }).compile();

    service = module.get<LivroService>(LivroService);
    client = module.get<LibertyLivroClient>(LibertyLivroClient);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(client).toBeDefined();
  });

  describe('buscarNoGoogle', () => {
    it('deve buscar livro no google', async () => {
      const nome = 'Clean Code';
      const response: GoogleLivro[] = [];
      mockLibertyLivroClient.buscarNoGoogle.mockResolvedValue(response);

      const result = await service.buscarNoGoogle(token, nome);

      expect(result).toEqual(response);
      expect(client.buscarNoGoogle).toHaveBeenCalledWith(token, nome, undefined);
    });

    it('deve lançar erro se nome não for informado', async () => {
      await expect(service.buscarNoGoogle(token, '')).rejects.toThrow(HttpException);
    });
  });

  describe('criar', () => {
    it('deve criar um livro', async () => {
      const request: GoogleLivro = {
        name: 'Livro Teste',
        author: 'Autor',
        description: 'Desc',
        pages: 100,
        image_link: 'link',
      };
      const response: Livro = { id: 1 } as Livro;
      mockLibertyLivroClient.criar.mockResolvedValue(response);

      const result = await service.criar(token, request);

      expect(result).toEqual(response);
      expect(client.criar).toHaveBeenCalledWith(token, request);
    });
  });

  describe('buscarTodos', () => {
    it('deve buscar todos os livros', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyLivroClient.buscarTodos.mockResolvedValue(response);

      const result = await service.buscarTodos(token, 1);

      expect(result).toEqual(response);
      expect(client.buscarTodos).toHaveBeenCalledWith(token, 1);
    });
  });

  describe('buscarFinalizados', () => {
    it('deve buscar livros finalizados', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyLivroClient.buscarFinalizados.mockResolvedValue(response);

      const result = await service.buscarFinalizados(token, 1);

      expect(result).toEqual(response);
      expect(client.buscarFinalizados).toHaveBeenCalledWith(token, 1);
    });
  });

  describe('buscarFinalizadosAno', () => {
    it('deve buscar livros finalizados por ano', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyLivroClient.buscarFinalizadosAno.mockResolvedValue(response);

      const result = await service.buscarFinalizadosAno(token, 1);

      expect(result).toEqual(response);
      expect(client.buscarFinalizadosAno).toHaveBeenCalledWith(token, 1);
    });
  });

  describe('buscarPlanoLeitura', () => {
    it('deve buscar plano de leitura', async () => {
      const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyLivroClient.planoLeitura.mockResolvedValue(response);

      const result = await service.buscarPlanoLeitura(token, '2025', 1);

      expect(result).toEqual(response);
      expect(client.planoLeitura).toHaveBeenCalledWith(token, '2025', 1);
    });
  });

  describe('buscarResumo', () => {
    it('deve buscar resumo', async () => {
      const response: Sumario = { total_lido: 10, total_lido_ano: 1, total_paginas: 1000 };
      mockLibertyLivroClient.resumo.mockResolvedValue(response);

      const result = await service.buscarResumo(token);

      expect(result).toEqual(response);
      expect(client.resumo).toHaveBeenCalledWith(token);
    });
  });

  describe('buscarNaBiblioteca', () => {
    it('deve buscar na biblioteca', async () => {
      const nome = 'Clean Code';
      const response: Livro[] = [];
      mockLibertyLivroClient.buscarBiblioteca.mockResolvedValue(response);

      const result = await service.buscarNaBiblioteca(token, nome);

      expect(result).toEqual(response);
      expect(client.buscarBiblioteca).toHaveBeenCalledWith(token, nome);
    });

    it('deve lançar erro se nome não for informado', async () => {
      await expect(service.buscarNaBiblioteca(token, '')).rejects.toThrow(HttpException);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar livro', async () => {
      const id = '1';
      const request: LivroUpdateRequest = {} as LivroUpdateRequest;
      const response: Livro = { id: 1 } as Livro;
      mockLibertyLivroClient.atualizar.mockResolvedValue(response);

      const result = await service.atualizar(token, id, request);

      expect(result).toEqual(response);
      expect(client.atualizar).toHaveBeenCalledWith(token, id, request);
    });
  });

  describe('deletar', () => {
    it('deve deletar livro', async () => {
      const id = '1';
      mockLibertyLivroClient.deletar.mockResolvedValue({ status: 'ok' });

      const result = await service.deletar(token, id);

      expect(result).toEqual({ status: 'ok' });
      expect(client.deletar).toHaveBeenCalledWith(token, id);
    });
  });
});
