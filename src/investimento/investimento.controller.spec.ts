import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentoController } from './investimento.controller';
import { InvestimentoService } from './investimento.service';
import { InvestimentoRequest, InvestimentoUpdateRequest } from './request/investimento.request';
import { IInvestimentoItem, IInvestimento, ICarteira } from './model/investimento.model';
import { AuthorizationHeaderGuard } from '../auth/guards/authorization-header.guard';
import { ExecutionContext } from '@nestjs/common';

describe('InvestimentoController', () => {
  let controller: InvestimentoController;
  let service: InvestimentoService;

  const mockInvestimentoService = {
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarPorSegmento: jest.fn(),
    atualizar: jest.fn(),
    buscarCarteira: jest.fn(),
    consolidar: jest.fn(),
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
      controllers: [InvestimentoController],
      providers: [
        {
          provide: InvestimentoService,
          useValue: mockInvestimentoService,
        },
      ],
    })
      .overrideGuard(AuthorizationHeaderGuard)
      .useValue(mockAuthorizationHeaderGuard)
      .compile();

    controller = module.get<InvestimentoController>(InvestimentoController);
    service = module.get<InvestimentoService>(InvestimentoService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('criar', () => {
    it('deve chamar service.criar', async () => {
      const request: InvestimentoRequest = { ticket: 'TEST3', segmento: 'Ações' };
      const response: IInvestimentoItem = { id: 1 } as IInvestimentoItem;
      mockInvestimentoService.criar.mockResolvedValue(response);

      const result = await controller.criar(mockRequest, request);

      expect(result).toEqual(response);
      expect(service.criar).toHaveBeenCalledWith('valid_token', request);
    });
  });

  describe('buscarTodos', () => {
    it('deve chamar service.buscarTodos', async () => {
      const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockInvestimentoService.buscarTodos.mockResolvedValue(response);

      const result = await controller.buscarTodos(mockRequest, { page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarTodos).toHaveBeenCalledWith('valid_token', 1);
    });
  });

  describe('buscarFinalizados', () => {
    it('deve chamar service.buscarPorSegmento', async () => {
      const segmento = 'Ações';
      const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockInvestimentoService.buscarPorSegmento.mockResolvedValue(response);

      const result = await controller.buscarFinalizados(mockRequest, segmento, { page: 1 });

      expect(result).toEqual(response);
      expect(service.buscarPorSegmento).toHaveBeenCalledWith('valid_token', segmento, 1);
    });
  });

  describe('buscarCarteira', () => {
    it('deve chamar service.buscarCarteira', async () => {
      const response: ICarteira = {} as ICarteira;
      mockInvestimentoService.buscarCarteira.mockResolvedValue(response);

      const result = await controller.buscarCarteira(mockRequest);

      expect(result).toEqual(response);
      expect(service.buscarCarteira).toHaveBeenCalledWith('valid_token');
    });
  });

  describe('consolidaCarteira', () => {
    it('deve chamar service.consolidar', async () => {
      mockInvestimentoService.consolidar.mockResolvedValue({ status: 'ok' });

      const result = await controller.consolidaCarteira(mockRequest);

      expect(result).toEqual({ status: 'ok' });
      expect(service.consolidar).toHaveBeenCalledWith('valid_token');
    });
  });

  describe('atualizar', () => {
    it('deve chamar service.atualizar', async () => {
      const id = '1';
      const request: InvestimentoUpdateRequest = { versao: 1 };
      const response: IInvestimentoItem = { id: 1 } as IInvestimentoItem;
      mockInvestimentoService.atualizar.mockResolvedValue(response);

      const result = await controller.atualizar(mockRequest, id, request);

      expect(result).toEqual(response);
      expect(service.atualizar).toHaveBeenCalledWith('valid_token', id, request);
    });
  });

  describe('deletar', () => {
    it('deve chamar service.deletar', async () => {
      const id = '1';
      mockInvestimentoService.deletar.mockResolvedValue({ status: 'ok' });

      const result = await controller.deletar(mockRequest, id);

      expect(result).toEqual({ status: 'ok' });
      expect(service.deletar).toHaveBeenCalledWith('valid_token', id);
    });
  });
});
