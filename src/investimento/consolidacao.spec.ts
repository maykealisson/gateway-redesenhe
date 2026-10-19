import { Test } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { InvestimentoController } from './investimento.controller';
import { InvestimentoService } from './investimento.service';
import { LibertyInvestimentoClient } from '../client/liberty.investimento.client';
import { FinNewClient } from '../client/fin-news.client';
import { RequestService } from '../provider/request/request.service';

// Exercises the HTTP controller -> service -> Liberty client chain without external services.
describe('Acompanhamento da consolidação', () => {
  let app: NestFastifyApplication;
  const upstream = { post: jest.fn(), get: jest.fn() };
  const headers = { authorization: 'Bearer teste-token' };
  const processamento = {
    id: 'job-1',
    status: 'EM_PROCESSAMENTO',
    inicio: '2026-10-17T15:00:00Z',
  };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [InvestimentoController],
      providers: [
        InvestimentoService,
        LibertyInvestimentoClient,
        { provide: RequestService, useValue: upstream },
        { provide: FinNewClient, useValue: {} },
      ],
    }).compile();
    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.setGlobalPrefix('gateway');
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  beforeEach(() => jest.clearAllMocks());
  afterAll(async () => app.close());

  it('inicia por POST, encaminha autenticação e retorna 202 com identificador', async () => {
    upstream.post.mockResolvedValue(processamento);
    const response = await app.inject({
      method: 'POST',
      url: '/gateway/v1/investimentos/consolida-carteira',
      headers,
    });
    expect(response.statusCode).toBe(202);
    expect(response.json()).toEqual(processamento);
    expect(response.headers['cache-control']).toBe('no-store');
    expect(response.headers['retry-after']).toBe('3');
    expect(upstream.post).toHaveBeenCalledWith(
      expect.stringContaining('/v1/ativos/consolida-carteira'),
      undefined,
      { Authorization: 'Bearer teste-token' },
    );
  });

  it('consulta status sem cache e encaminha a identidade do usuário', async () => {
    upstream.get.mockResolvedValue({ ...processamento, status: 'CONCLUIDO' });
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/consolida-carteira/status',
      headers,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json().status).toBe('CONCLUIDO');
    expect(response.headers['cache-control']).toBe('no-store');
    expect(upstream.get).toHaveBeenCalledWith(
      expect.stringContaining('/v1/ativos/consolida-carteira/status'),
      { Authorization: 'Bearer teste-token' },
    );
  });

  it('retorna 204 quando não existe consolidação', async () => {
    upstream.get.mockResolvedValue('');
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/consolida-carteira/status',
      headers,
    });
    expect(response.statusCode).toBe(204);
  });

  it('não oculta falha do backend como resposta de sucesso', async () => {
    upstream.get.mockRejectedValue({
      status: 503,
      message: 'Serviço indisponível',
    });
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/consolida-carteira/status',
      headers,
    });
    expect(response.statusCode).toBe(503);
  });

  it('exige autenticação para acompanhar a consolidação', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/consolida-carteira/status',
    });
    expect(response.statusCode).toBe(403);
    expect(upstream.get).not.toHaveBeenCalled();
  });
  it('preserva a resposta antiga da carteira sem exigir novos campos', async () => {
    const carteiraAntiga = {
      valor: 6736.15,
      rentabilidade: { valor: 1346.56, porcentagem: 24.98 },
      evolucao: [],
    };
    upstream.get.mockResolvedValue(carteiraAntiga);
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/carteira',
      headers,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(carteiraAntiga);
    expect(typeof response.json().rentabilidade.valor).toBe('number');
  });

  it('encaminha o indicador opcional de cálculo estimado sem alterar os valores', async () => {
    const carteira = {
      valor: 1200,
      rentabilidade: { valor: 600, porcentagem: 100, estimada: true },
      evolucao: [],
    };
    upstream.get.mockResolvedValue(carteira);
    const response = await app.inject({
      method: 'GET',
      url: '/gateway/v1/investimentos/carteira',
      headers,
    });
    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual(carteira);
  });
});
