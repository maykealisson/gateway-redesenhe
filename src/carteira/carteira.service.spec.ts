import { Test, TestingModule } from '@nestjs/testing';
import { CarteiraService } from './carteira.service';
import { LibertyCarteiraClient } from '../client/liberty.carteira.client';

describe('CarteiraService', () => {
  let service: CarteiraService;

  const client = {
    buscarAlocacaoAlvo: jest.fn(),
    salvarAlocacaoAlvo: jest.fn(),
    rebalancear: jest.fn(),
    benchmarks: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarteiraService,
        { provide: LibertyCarteiraClient, useValue: client },
      ],
    }).compile();
    service = module.get(CarteiraService);
  });

  it('busca a alocação alvo repassando o token', async () => {
    client.buscarAlocacaoAlvo.mockResolvedValue([
      { segmento: 'ACAO', percentual: 100 },
    ]);
    await expect(service.buscarAlocacaoAlvo('tk')).resolves.toEqual([
      { segmento: 'ACAO', percentual: 100 },
    ]);
    expect(client.buscarAlocacaoAlvo).toHaveBeenCalledWith('tk');
  });

  it('salva a alocação alvo', async () => {
    const request = { alocacoes: [{ segmento: 'FII', percentual: 100 }] };
    client.salvarAlocacaoAlvo.mockResolvedValue(request.alocacoes);
    await service.salvarAlocacaoAlvo('tk', request);
    expect(client.salvarAlocacaoAlvo).toHaveBeenCalledWith('tk', request);
  });

  it('calcula o rebalanceamento com o aporte informado', async () => {
    client.rebalancear.mockResolvedValue({ aporte: 500, segmentos: [] });
    await service.rebalancear('tk', 500);
    expect(client.rebalancear).toHaveBeenCalledWith('tk', 500);
  });

  it('propaga erro do client', async () => {
    client.rebalancear.mockRejectedValue(new Error('falhou'));
    await expect(service.rebalancear('tk', 0)).rejects.toThrow('falhou');
  });

  it('busca benchmarks a partir da data informada', async () => {
    client.benchmarks.mockResolvedValue({ datas: [], series: [] });
    await service.benchmarks('tk', '2026-01-01');
    expect(client.benchmarks).toHaveBeenCalledWith('tk', '2026-01-01');
  });
});
