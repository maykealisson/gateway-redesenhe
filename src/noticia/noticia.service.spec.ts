import { Test, TestingModule } from '@nestjs/testing';
import { NoticiaService } from './noticia.service';
import { FinNewClient } from '../client/fin-news.client';
import { LibertyInvestimentoClient } from '../client/liberty.investimento.client';

const noticia = (link: string, data: string) => ({
  link,
  titulo: link,
  resumo: '',
  data,
  images: [],
});

describe('NoticiaService', () => {
  let service: NoticiaService;
  const investimento = { buscarTickets: jest.fn() };
  const finNews = { buscarNoticia: jest.fn() };
  const agora = new Date('2026-11-08T12:00:00Z');

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NoticiaService,
        { provide: LibertyInvestimentoClient, useValue: investimento },
        { provide: FinNewClient, useValue: finNews },
      ],
    }).compile();
    service = module.get(NoticiaService);
  });

  it('agrupa por ticker, filtra período e remove duplicadas', async () => {
    investimento.buscarTickets.mockResolvedValue(['petr4', 'VALE3', 'PETR4']);
    finNews.buscarNoticia.mockImplementation(async (ticker: string) => ({
      noticias:
        ticker === 'PETR4'
          ? [
              noticia('a', '2026-11-07T10:00:00Z'),
              noticia('velha', '2026-10-01T10:00:00Z'),
              noticia('comum', '2026-11-06T10:00:00Z'),
            ]
          : [noticia('comum', '2026-11-06T10:00:00Z')],
    }));

    const resultado = await service.carteira('tk', 7, agora);

    expect(finNews.buscarNoticia).toHaveBeenCalledTimes(2);
    expect(resultado.total).toBe(2);
    const petr = resultado.ativos.find((a) => a.ticker === 'PETR4');
    expect(petr?.noticias.map((n) => n.link)).toEqual(['a', 'comum']);
    expect(petr?.noticias[1].tickers).toEqual(['PETR4', 'VALE3']);
    expect(resultado.ativos.find((a) => a.ticker === 'VALE3')?.total).toBe(0);
  });

  it('marca erro no ativo sem derrubar a resposta', async () => {
    investimento.buscarTickets.mockResolvedValue(['ITSA4', 'BBAS3']);
    finNews.buscarNoticia.mockImplementation(async (ticker: string) => {
      if (ticker === 'ITSA4') throw new Error('timeout');
      return { noticias: [noticia('b', '2026-11-08T08:00:00Z')] };
    });

    const resultado = await service.carteira('tk', 7, agora);

    expect(resultado.ativos[0]).toMatchObject({ ticker: 'BBAS3', total: 1 });
    expect(resultado.ativos[1]).toMatchObject({ ticker: 'ITSA4', erro: true });
  });
});
