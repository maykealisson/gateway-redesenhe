import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { LivroTrilhaController } from './livro.trilha.controller';
import { LivroTrilhaService } from './livro.trilha.service';
import { AuthorizationHeaderGuard } from '../auth/guards/authorization-header.guard';
import { Trilha } from './model/trilha.model';
import { TrilhaRequest } from './request/trilha.request';

describe('LivroTrilhaController', () => {
  let controller: LivroTrilhaController;
  let service: LivroTrilhaService;

  const mockService = {
    buscarTodas: jest.fn(),
    buscarPorId: jest.fn(),
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
    gerar: jest.fn(),
  };

  const mockGuard = {
    canActivate: (context: ExecutionContext) => true,
  };

  const mockRequest = { headers: { authorization: 'Bearer valid_token' } };
  const trilha = { id: 1, nome: 'T', itens: [] } as unknown as Trilha;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LivroTrilhaController],
      providers: [{ provide: LivroTrilhaService, useValue: mockService }],
    })
      .overrideGuard(AuthorizationHeaderGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<LivroTrilhaController>(LivroTrilhaController);
    service = module.get<LivroTrilhaService>(LivroTrilhaService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve buscar todas', async () => {
    mockService.buscarTodas.mockResolvedValue([trilha]);
    expect(await controller.buscarTodas(mockRequest)).toEqual([trilha]);
    expect(service.buscarTodas).toHaveBeenCalledWith('valid_token');
  });

  it('deve buscar por id', async () => {
    mockService.buscarPorId.mockResolvedValue(trilha);
    expect(await controller.buscarPorId(mockRequest, '1')).toEqual(trilha);
    expect(service.buscarPorId).toHaveBeenCalledWith('valid_token', '1');
  });

  it('deve criar', async () => {
    const request: TrilhaRequest = { nome: 'T' };
    mockService.criar.mockResolvedValue(trilha);
    await controller.criar(mockRequest, request);
    expect(service.criar).toHaveBeenCalledWith('valid_token', request);
  });

  it('deve atualizar', async () => {
    const request: TrilhaRequest = { nome: 'T' };
    mockService.atualizar.mockResolvedValue(trilha);
    await controller.atualizar(mockRequest, '1', request);
    expect(service.atualizar).toHaveBeenCalledWith('valid_token', '1', request);
  });

  it('deve deletar', async () => {
    mockService.deletar.mockResolvedValue({});
    await controller.deletar(mockRequest, '1');
    expect(service.deletar).toHaveBeenCalledWith('valid_token', '1');
  });

  it('deve gerar', async () => {
    mockService.gerar.mockResolvedValue(trilha);
    await controller.gerar(mockRequest, { tema: 'estoicismo' });
    expect(service.gerar).toHaveBeenCalledWith('valid_token', 'estoicismo');
  });
});
