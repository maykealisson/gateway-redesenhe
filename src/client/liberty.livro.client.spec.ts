import { Test, TestingModule } from '@nestjs/testing';
import { LibertyLivroClient } from './liberty.livro.client';
import { RequestService } from '../provider/request/request.service';
import { LivroUpdateRequest } from '../livro/request/livro.request';
import { GoogleLivro } from '../livro/model/livro.google.model';
import { Livro, LivroPage } from '../livro/model/livro.model';
import { Sumario } from '../livro/model/sumario.model';
import { HttpException } from '@nestjs/common';

describe('LibertyLivroClient', () => {
    let client: LibertyLivroClient;
    let requestService: RequestService;

    const mockRequestService = {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    };

    const token = 'valid_token';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LibertyLivroClient,
                {
                    provide: RequestService,
                    useValue: mockRequestService,
                },
            ],
        }).compile();

        client = module.get<LibertyLivroClient>(LibertyLivroClient);
        requestService = module.get<RequestService>(RequestService);
    });

    it('deve estar definido', () => {
        expect(client).toBeDefined();
        expect(requestService).toBeDefined();
    });

    describe('buscarNoGoogle', () => {
        it('deve buscar no google', async () => {
            const nome = 'Clean Code';
            const response: GoogleLivro[] = [];
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarNoGoogle(token, nome);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/buscar-google?name=' + nome),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('criar', () => {
        it('deve criar livro', async () => {
            const request: GoogleLivro = {
                name: 'Livro Teste',
                author: 'Autor',
                description: 'Desc',
                pages: 100,
                image_link: 'link',
            };
            const response: Livro = { id: 1 } as Livro;

            mockRequestService.post.mockResolvedValue(response);

            const result = await client.criar(token, request);

            expect(result).toEqual(response);
            expect(requestService.post).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros'),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarTodos', () => {
        it('deve buscar todos', async () => {
            const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarTodos(token, 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros?page=1'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarFinalizados', () => {
        it('deve buscar finalizados', async () => {
            const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarFinalizados(token, 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/finalizados?page=1'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarFinalizadosAno', () => {
        it('deve buscar finalizados ano', async () => {
            const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarFinalizadosAno(token, 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/finalizados?page=1'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('planoLeitura', () => {
        it('deve buscar plano leitura', async () => {
            const response: LivroPage = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.planoLeitura(token, '2025', 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/plano-leitura?page=1&ano=2025'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('resumo', () => {
        it('deve buscar resumo', async () => {
            const response: Sumario = { total_lido: 10, total_lido_ano: 1, total_paginas: 1000 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.resumo(token);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/resumo'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarBiblioteca', () => {
        it('deve buscar biblioteca', async () => {
            const nome = 'Clean Code';
            const response: Livro[] = [];
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarBiblioteca(token, nome);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/buscar-biblioteca?name=' + nome),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('atualizar', () => {
        it('deve atualizar', async () => {
            const id = '1';
            const request: LivroUpdateRequest = {} as LivroUpdateRequest;
            const response: Livro = { id: 1 } as Livro;
            mockRequestService.put.mockResolvedValue(response);

            const result = await client.atualizar(token, id, request);

            expect(result).toEqual(response);
            expect(requestService.put).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/' + id),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('deletar', () => {
        it('deve deletar', async () => {
            const id = '1';
            mockRequestService.delete.mockResolvedValue({ status: 'ok' });

            const result = await client.deletar(token, id);

            expect(result).toEqual({ status: 'ok' });
            expect(requestService.delete).toHaveBeenCalledWith(
                expect.stringContaining('/v1/livros/' + id),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });
});
