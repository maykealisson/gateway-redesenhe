import { Test, TestingModule } from '@nestjs/testing';
import { LibertyMetaClient } from './liberty.meta.client';
import { RequestService } from '../provider/request/request.service';
import { MetaRequest } from '../meta/request/meta.request';
import { Meta } from '../meta/model/meta.model';
import { HttpException } from '@nestjs/common';

describe('LibertyMetaClient', () => {
    let client: LibertyMetaClient;
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
                LibertyMetaClient,
                {
                    provide: RequestService,
                    useValue: mockRequestService,
                },
            ],
        }).compile();

        client = module.get<LibertyMetaClient>(LibertyMetaClient);
        requestService = module.get<RequestService>(RequestService);
    });

    it('deve estar definido', () => {
        expect(client).toBeDefined();
        expect(requestService).toBeDefined();
    });

    describe('buscarMetas', () => {
        it('deve buscar metas', async () => {
            const response: Meta[] = [];
            mockRequestService.get.mockResolvedValue(response);

            const result = await client.buscarMetas(token);

            expect(result).toEqual(response);
            expect(requestService.get).toHaveBeenCalledWith(
                expect.stringContaining('/v1/metas'),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('criar', () => {
        it('deve criar meta', async () => {
            const request: MetaRequest = {
                nome: 'Meta 1',
                descricao: 'Desc',
                categoria: 'Cat',
                valor: '1000',
                valorAtual: '0',
                dataConclusao: '2025-12-31',
            };
            const response: Meta = {} as Meta;
            mockRequestService.post.mockResolvedValue(response);

            const result = await client.criar(token, request);

            expect(result).toEqual(response);
            expect(requestService.post).toHaveBeenCalledWith(
                expect.stringContaining('/v1/metas'),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('atualizar', () => {
        it('deve atualizar meta', async () => {
            const id = '1';
            const request: MetaRequest = {
                nome: 'Meta 1',
                descricao: 'Desc',
                categoria: 'Cat',
                valor: '1000',
                valorAtual: '0',
                dataConclusao: '2025-12-31',
            };
            const response: Meta = {} as Meta;
            mockRequestService.put.mockResolvedValue(response);

            const result = await client.atualizar(token, id, request);

            expect(result).toEqual(response);
            expect(requestService.put).toHaveBeenCalledWith(
                expect.stringContaining('/v1/metas/' + id),
                request,
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });

    describe('deletar', () => {
        it('deve deletar meta', async () => {
            const id = '1';
            mockRequestService.delete.mockResolvedValue({ status: 'ok' });

            const result = await client.deletar(token, id);

            expect(result).toEqual({ status: 'ok' });
            expect(requestService.delete).toHaveBeenCalledWith(
                expect.stringContaining('/v1/metas/' + id),
                expect.objectContaining({ Authorization: `Bearer ${token}` }),
            );
        });
    });
});
