import { Test, TestingModule } from '@nestjs/testing';
import { MetaController } from './meta.controller';
import { MetaService } from './meta.service';
import { MetaRequest } from './request/meta.request';
import { Meta } from './model/meta.model';
import { AuthorizationHeaderGuard } from '../auth/guards/authorization-header.guard';
import { ExecutionContext } from '@nestjs/common';

describe('MetaController', () => {
    let controller: MetaController;
    let service: MetaService;

    const mockMetaService = {
        buscarTodas: jest.fn(),
        criar: jest.fn(),
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
            controllers: [MetaController],
            providers: [
                {
                    provide: MetaService,
                    useValue: mockMetaService,
                },
            ],
        })
            .overrideGuard(AuthorizationHeaderGuard)
            .useValue(mockAuthorizationHeaderGuard)
            .compile();

        controller = module.get<MetaController>(MetaController);
        service = module.get<MetaService>(MetaService);
    });

    it('deve estar definido', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('buscarTodas', () => {
        it('deve buscar todas as metas', async () => {
            const response: Meta[] = [];
            mockMetaService.buscarTodas.mockResolvedValue(response);

            const result = await controller.buscarTodas(mockRequest);

            expect(result).toEqual(response);
            expect(service.buscarTodas).toHaveBeenCalledWith('valid_token');
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
            mockMetaService.criar.mockResolvedValue(response);

            const result = await controller.criar(mockRequest, request);

            expect(result).toEqual(response);
            expect(service.criar).toHaveBeenCalledWith('valid_token', request);
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
            mockMetaService.atualizar.mockResolvedValue(response);

            const result = await controller.atualizar(mockRequest, id, request);

            expect(result).toEqual(response);
            expect(service.atualizar).toHaveBeenCalledWith('valid_token', id, request);
        });
    });

    describe('deletar', () => {
        it('deve deletar uma meta', async () => {
            const id = '1';
            mockMetaService.deletar.mockResolvedValue({ status: 'ok' });

            const result = await controller.deletar(mockRequest, id);

            expect(result).toEqual({ status: 'ok' });
            expect(service.deletar).toHaveBeenCalledWith('valid_token', id);
        });
    });
});
