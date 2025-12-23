import { Test, TestingModule } from '@nestjs/testing';
import { LibertyInvestimentoClient } from './liberty.investimento.client';
import { RequestService } from '../provider/request/request.service';
import { InvestimentoRequest, InvestimentoUpdateRequest } from '../investimento/request/investimento.request';
import { IInvestimentoItem, IInvestimento, ICarteira } from '../investimento/model/investimento.model';
import { HttpException } from '@nestjs/common';

describe('LibertyInvestimentoClient', () => {
    let client: LibertyInvestimentoClient;
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
                LibertyInvestimentoClient,
                {
                    provide: RequestService,
                    useValue: mockRequestService,
                },
            ],
        }).compile();

        client = module.get<LibertyInvestimentoClient>(LibertyInvestimentoClient);
        requestService = module.get<RequestService>(RequestService);
    });

    it('deve estar definido', () => {
        expect(client).toBeDefined();
        expect(requestService).toBeDefined();
    });

    describe('criar', () => {
        it('deve criar investimento', async () => {
            const request: InvestimentoRequest = { ticket: 'TEST3', segmento: 'Ações' };
            const response: IInvestimentoItem = { id: 1 } as IInvestimentoItem;

            mockRequestService.post.mockResolvedValue(response);

            const result = await client.criar(token, request);

            expect(result).toEqual(response);
            expect(requestService.post).toHaveBeenCalledWith(
                expect.stringContaining('/v1/ativos'),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarTodos', () => {
        it('deve buscar todos investimentos', async () => {
            const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarTodos(token, 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/ativos?page=1'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarPorSegmento', () => {
        it('deve buscar por segmento', async () => {
            const segmento = 'Ações';
            const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarPorSegmento(token, segmento, 1);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/ativos/segmento/${segmento}?page=1`),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('atualizar', () => {
        it('deve atualizar investimento', async () => {
            const id = '1';
            const request: InvestimentoUpdateRequest = { versao: 1 };
            const response: IInvestimentoItem = { id: 1 } as IInvestimentoItem;
            mockRequestService.put.mockResolvedValue(response);

            const result = await client.atualizar(token, id, request);

            expect(result).toEqual(response);
            expect(requestService.put).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/ativos/${id}`),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('deletar', () => {
        it('deve deletar investimento', async () => {
            const id = '1';
            mockRequestService.delete.mockResolvedValue({ status: 'ok' });

            const result = await client.deletar(token, id);

            expect(result).toEqual({ status: 'ok' });
            expect(requestService.delete).toHaveBeenCalledWith(
                expect.stringContaining(`/v1/ativos/${id}`),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('buscarCarteira', () => {
        it('deve buscar carteira', async () => {
            const response: ICarteira = {} as ICarteira;
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarCarteira(token);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/ativos/carteira'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('consolidar', () => {
        it('deve consolidar carteira', async () => {
            mockRequestService.get.mockResolvedValue({ status: 'ok' });

            const result = await client.consolidar(token);

            expect(result).toEqual({ status: 'ok' });
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/ativos/consolida-carteira'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });
});
