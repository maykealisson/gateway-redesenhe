import { Test, TestingModule } from '@nestjs/testing';
import { MetaAcompanhamentoController } from './meta.acompanhamento.controller';
import { LibertyMetaAcompanhamentoClient } from '../client/liberty.meta.acompanhamento.client';
import { AuthorizationHeaderGuard } from '../auth/guards/authorization-header.guard';

describe('MetaAcompanhamentoController', () => {
  let controller: MetaAcompanhamentoController;
  const client = {
    criarMarco: jest.fn(),
    atualizarMarco: jest.fn(),
    deletarMarco: jest.fn(),
    listarRevisoes: jest.fn(),
    revisar: jest.fn(),
    revisoesPendentes: jest.fn(),
  };
  const req = { headers: { authorization: 'Bearer tk' } };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaAcompanhamentoController],
      providers: [
        { provide: LibertyMetaAcompanhamentoClient, useValue: client },
      ],
    })
      .overrideGuard(AuthorizationHeaderGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get(MetaAcompanhamentoController);
  });

  it('repassa token e ids para marcos', async () => {
    const marco = { nome: 'Ler 5 livros', prazo: '2026-06-30' };
    await controller.criarMarco(req, '3', marco);
    await controller.atualizarMarco(req, '3', '9', {
      ...marco,
      concluida: true,
    });
    await controller.deletarMarco(req, '3', '9');
    expect(client.criarMarco).toHaveBeenCalledWith('tk', '3', marco);
    expect(client.atualizarMarco).toHaveBeenCalledWith('tk', '3', '9', {
      ...marco,
      concluida: true,
    });
    expect(client.deletarMarco).toHaveBeenCalledWith('tk', '3', '9');
  });

  it('registra e lista revisões', async () => {
    await controller.revisar(req, '3', { confianca: 4, proximoPasso: 'x' });
    await controller.listarRevisoes(req, '3');
    await controller.revisoesPendentes(req);
    expect(client.revisar).toHaveBeenCalledWith('tk', '3', {
      confianca: 4,
      proximoPasso: 'x',
    });
    expect(client.listarRevisoes).toHaveBeenCalledWith('tk', '3');
    expect(client.revisoesPendentes).toHaveBeenCalledWith('tk');
  });
});
