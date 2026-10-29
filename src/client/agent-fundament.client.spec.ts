import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { AgentFundamentClient } from './agent-fundament.client';

describe('AgentFundamentClient', () => {
  let client: AgentFundamentClient;
  const mockHttpService = { request: jest.fn() };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AgentFundamentClient,
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    client = module.get<AgentFundamentClient>(AgentFundamentClient);
  });

  it('deve enviar a análise para o agent-fundament', async () => {
    mockHttpService.request.mockReturnValue(of({ data: { id: 1 } }));
    const body = { conteudo: 'md' };

    const result = await client.enviarAnalise('ITSA4', body);

    expect(result).toEqual({ id: 1 });
    expect(mockHttpService.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'POST',
        url: '/ativos/ITSA4/analises',
        data: body,
      }),
    );
  });

  it('deve usar timeout maior e repassar a margem no relatório', async () => {
    mockHttpService.request.mockReturnValue(of({ data: { ticker: 'ITSA4' } }));

    await client.gerarRelatorio('ITSA4', 30);

    expect(mockHttpService.request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: '/ativos/ITSA4/relatorio',
        params: { margem_desejada: 30 },
        timeout: 120000,
      }),
    );
  });

  it('deve manter status e mensagem do erro do FastAPI', async () => {
    mockHttpService.request.mockReturnValue(
      throwError(() => ({
        response: { status: 422, data: { detail: 'Arquivo sem frontmatter' } },
      })),
    );

    await expect(
      client.enviarAnalise('ITSA4', { conteudo: 'x' }),
    ).rejects.toMatchObject({
      status: 422,
      response: 'Arquivo sem frontmatter',
    });
  });

  it('deve retornar 503 quando o agent-fundament estiver fora do ar', async () => {
    mockHttpService.request.mockReturnValue(
      throwError(() => ({
        code: 'ECONNREFUSED',
        message: 'connect ECONNREFUSED',
      })),
    );

    const erro = await client.listarAnalises('ITSA4').catch((e) => e);
    expect(erro).toBeInstanceOf(HttpException);
    expect(erro.getStatus()).toBe(503);
  });
});
