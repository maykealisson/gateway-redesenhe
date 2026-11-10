import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { LivroTrilhaService } from './livro.trilha.service';
import { LibertyLivroClient } from '../client/liberty.livro.client';
import { Trilha } from './model/trilha.model';
import { TrilhaRequest } from './request/trilha.request';

describe('LivroTrilhaService', () => {
  let service: LivroTrilhaService;
  let client: LibertyLivroClient;

  const mockClient = {
    buscarTrilhas: jest.fn(),
    buscarTrilha: jest.fn(),
    criarTrilha: jest.fn(),
    atualizarTrilha: jest.fn(),
    deletarTrilha: jest.fn(),
    gerarTrilha: jest.fn(),
  };

  const token = 'valid_token';
  const trilha = { id: 1, nome: 'T', itens: [] } as unknown as Trilha;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LivroTrilhaService,
        { provide: LibertyLivroClient, useValue: mockClient },
      ],
    }).compile();

    service = module.get<LivroTrilhaService>(LivroTrilhaService);
    client = module.get<LibertyLivroClient>(LibertyLivroClient);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  it('deve buscar todas as trilhas', async () => {
    mockClient.buscarTrilhas.mockResolvedValue([trilha]);
    expect(await service.buscarTodas(token)).toEqual([trilha]);
    expect(client.buscarTrilhas).toHaveBeenCalledWith(token);
  });

  it('deve buscar trilha por id', async () => {
    mockClient.buscarTrilha.mockResolvedValue(trilha);
    expect(await service.buscarPorId(token, '1')).toEqual(trilha);
    expect(client.buscarTrilha).toHaveBeenCalledWith(token, '1');
  });

  it('deve criar trilha', async () => {
    const request: TrilhaRequest = { nome: 'T', itens: [] };
    mockClient.criarTrilha.mockResolvedValue(trilha);
    expect(await service.criar(token, request)).toEqual(trilha);
    expect(client.criarTrilha).toHaveBeenCalledWith(token, request);
  });

  it('deve atualizar trilha', async () => {
    const request: TrilhaRequest = { nome: 'T2' };
    mockClient.atualizarTrilha.mockResolvedValue(trilha);
    await service.atualizar(token, '1', request);
    expect(client.atualizarTrilha).toHaveBeenCalledWith(token, '1', request);
  });

  it('deve deletar trilha', async () => {
    mockClient.deletarTrilha.mockResolvedValue({});
    await service.deletar(token, '1');
    expect(client.deletarTrilha).toHaveBeenCalledWith(token, '1');
  });

  it('deve gerar trilha com tema sem espacos', async () => {
    mockClient.gerarTrilha.mockResolvedValue(trilha);
    await service.gerar(token, ' estoicismo ');
    expect(client.gerarTrilha).toHaveBeenCalledWith(token, 'estoicismo');
  });

  it('deve lançar erro se tema não for informado', async () => {
    await expect(service.gerar(token, ' ')).rejects.toThrow(HttpException);
    expect(client.gerarTrilha).not.toHaveBeenCalled();
  });
});
