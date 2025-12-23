import { Test, TestingModule } from '@nestjs/testing';
import { MetaService } from './meta.service';
import { LibertyMetaClient } from '../client/liberty.meta.client';
import { MetaRequest } from './request/meta.request';
import { Meta } from './model/meta.model';

describe('MetaService', () => {
    let service: MetaService;
    let client: LibertyMetaClient;

    const mockLibertyMetaClient = {
        buscarMetas: jest.fn(),
        criar: jest.fn(),
        atualizar: jest.fn(),
        deletar: jest.fn(),
    };

    const token = 'valid_token';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MetaService,
                {
                    provide: LibertyMetaClient,
                    useValue: mockLibertyMetaClient,
                },
            ],
        }).compile();

        service = module.get<MetaService>(MetaService);
        client = module.get<LibertyMetaClient>(LibertyMetaClient);
    });

    it('deve estar definido', () => {
        expect(service).toBeDefined();
        expect(client).toBeDefined();
    });

    describe('buscarTodas', () => {
        it('deve buscar todas as metas', async () => {
            const response: Meta[] = [];
            mockLibertyMetaClient.buscarMetas.mockResolvedValue(response);

            const result = await service.buscarTodas(token);

            expect(result).toEqual(response);
            expect(client.buscarMetas).toHaveBeenCalledWith(token);
        });
    });

    describe('criar', () => {
        it('deve criar uma meta', async () => {
            const request: MetaRequest = {
                nome: 'Meta 1',
                descricao: 'Desc',
                categoria: 'Cat',
                valor: '1000',
                valorAtual: '0',
                dataConclusao: '2025-12-31',
            };
            const response: Meta = {} as Meta;
            mockLibertyMetaClient.criar.mockResolvedValue(response);

            const result = await service.criar(token, request);

            expect(result).toEqual(response);
            expect(client.criar).toHaveBeenCalledWith(token, request);
        });
    });

    describe('atualizar', () => {
        it('deve atualizar uma meta', async () => {
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
            mockLibertyMetaClient.atualizar.mockResolvedValue(response);

            const result = await service.atualizar(token, id, request);

            expect(result).toEqual(response);
            expect(client.atualizar).toHaveBeenCalledWith(token, id, request);
        });
    });

    describe('deletar', () => {
        it('deve deletar uma meta', async () => {
            const id = '1';
            mockLibertyMetaClient.deletar.mockResolvedValue({ status: 'ok' });

            const result = await service.deletar(token, id);

            expect(result).toEqual({ status: 'ok' });
            expect(client.deletar).toHaveBeenCalledWith(token, id);
        });
    });
});
