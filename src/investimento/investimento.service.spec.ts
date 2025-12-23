import { Test, TestingModule } from '@nestjs/testing';
import { InvestimentoService } from './investimento.service';
import { LibertyInvestimentoClient } from '../client/liberty.investimento.client';
import { InvestimentoRequest, InvestimentoUpdateRequest } from './request/investimento.request';
import { IInvestimentoItem, IInvestimento, ICarteira } from './model/investimento.model';
import { HttpException } from '@nestjs/common';

describe('InvestimentoService', () => {
  let service: InvestimentoService;
  let client: LibertyInvestimentoClient;

  const mockLibertyInvestimentoClient = {
    criar: jest.fn(),
    buscarTodos: jest.fn(),
    buscarPorSegmento: jest.fn(),
    atualizar: jest.fn(),
    buscarCarteira: jest.fn(),
    consolidar: jest.fn(),
    deletar: jest.fn(),
  };

  const token = 'valid_token';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvestimentoService,
        {
          provide: LibertyInvestimentoClient,
          useValue: mockLibertyInvestimentoClient,
        },
      ],
    }).compile();

    service = module.get<InvestimentoService>(InvestimentoService);
    client = module.get<LibertyInvestimentoClient>(LibertyInvestimentoClient);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
    expect(client).toBeDefined();
  });

  describe('criar', () => {
    it('deve criar um investimento com sucesso', async () => {
      const request: InvestimentoRequest = { ticket: 'TEST3', segmento: 'Ações' };
      const response: IInvestimentoItem = { id: 1, ticket: 'TEST3', segmento: 'Ações' } as IInvestimentoItem;

      mockLibertyInvestimentoClient.criar.mockResolvedValue(response);

      const result = await service.criar(token, request);

      expect(result).toEqual(response);
      expect(client.criar).toHaveBeenCalledWith(token, request);
    });
  });

  describe('buscarTodos', () => {
    it('deve buscar todos os investimentos', async () => {
      const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyInvestimentoClient.buscarTodos.mockResolvedValue(response);

      const result = await service.buscarTodos(token, 1);

      expect(result).toEqual(response);
      expect(client.buscarTodos).toHaveBeenCalledWith(token, 1);
    });
  });

  describe('buscarPorSegmento', () => {
    it('deve buscar investimentos por segmento', async () => {
      const segmento = 'Ações';
      const response: IInvestimento = { content: [], totalPages: 0, totalElements: 0, size: 0 };
      mockLibertyInvestimentoClient.buscarPorSegmento.mockResolvedValue(response);

      const result = await service.buscarPorSegmento(token, segmento, 1);

      expect(result).toEqual(response);
      expect(client.buscarPorSegmento).toHaveBeenCalledWith(token, segmento, 1);
    });

    it('deve lançar erro se segmento não for informado', async () => {
      await expect(service.buscarPorSegmento(token, '', 1)).rejects.toThrow(HttpException);
    });
  });

  describe('atualizar', () => {
    it('deve atualizar um investimento', async () => {
      const id = '1';
      const request: InvestimentoUpdateRequest = { versao: 1 };
      const response: IInvestimentoItem = { id: 1, versao: 1 } as IInvestimentoItem;

      mockLibertyInvestimentoClient.atualizar.mockResolvedValue(response);

      const result = await service.atualizar(token, id, request);

      expect(result).toEqual(response);
      expect(client.atualizar).toHaveBeenCalledWith(token, id, request);
    });
  });

  describe('buscarCarteira', () => {
    it('deve buscar a carteira', async () => {
      const response: ICarteira = {} as ICarteira;
      mockLibertyInvestimentoClient.buscarCarteira.mockResolvedValue(response);

      const result = await service.buscarCarteira(token);

      expect(result).toEqual(response);
      expect(client.buscarCarteira).toHaveBeenCalledWith(token);
    });
  });

  describe('consolidar', () => {
    it('deve consolidar a carteira', async () => {
      mockLibertyInvestimentoClient.consolidar.mockResolvedValue({ status: 'ok' });

      const result = await service.consolidar(token);

      expect(result).toEqual({ status: 'ok' });
      expect(client.consolidar).toHaveBeenCalledWith(token);
    });
  });

  describe('deletar', () => {
    it('deve deletar um investimento', async () => {
      const id = '1';
      mockLibertyInvestimentoClient.deletar.mockResolvedValue({ status: 'ok' });

      const result = await service.deletar(token, id);

      expect(result).toEqual({ status: 'ok' });
      expect(client.deletar).toHaveBeenCalledWith(token, id);
    });
  });
});
