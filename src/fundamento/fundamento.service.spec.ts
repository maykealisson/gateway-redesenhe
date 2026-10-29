import { Test, TestingModule } from '@nestjs/testing';
import { HttpException } from '@nestjs/common';
import { FundamentoService } from './fundamento.service';
import { AgentFundamentClient } from '../client/agent-fundament.client';

describe('FundamentoService', () => {
  let service: FundamentoService;

  const mockClient = {
    enviarAnalise: jest.fn(),
    listarAnalises: jest.fn(),
    gerarRelatorio: jest.fn(),
    removerAnalise: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FundamentoService,
        { provide: AgentFundamentClient, useValue: mockClient },
      ],
    }).compile();

    service = module.get<FundamentoService>(FundamentoService);
  });

  it('deve enviar a análise com o ticker em maiúsculas', async () => {
    const request = {
      conteudo: '---\nticker: ITSA4\n---',
      nome_arquivo: 'a.md',
    };
    mockClient.enviarAnalise.mockResolvedValue({ id: 1 });

    const result = await service.enviarAnalise('itsa4', request);

    expect(result).toEqual({ id: 1 });
    expect(mockClient.enviarAnalise).toHaveBeenCalledWith('ITSA4', request);
  });

  it('deve repassar a margem desejada ao gerar o relatório', async () => {
    mockClient.gerarRelatorio.mockResolvedValue({ ticker: 'ITSA4' });

    await service.gerarRelatorio('ITSA4', 25);

    expect(mockClient.gerarRelatorio).toHaveBeenCalledWith('ITSA4', 25);
  });

  it('deve rejeitar ticker inválido sem chamar o agent-fundament', async () => {
    await expect(service.listarAnalises('../health')).rejects.toThrow(
      HttpException,
    );
    expect(mockClient.listarAnalises).not.toHaveBeenCalled();
  });

  it('deve remover a análise', async () => {
    await service.removerAnalise(3);
    expect(mockClient.removerAnalise).toHaveBeenCalledWith(3);
  });
});
