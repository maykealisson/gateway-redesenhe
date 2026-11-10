import { Test, TestingModule } from '@nestjs/testing';
import { ProventoService } from './provento.service';
import { LibertyProventoClient } from '../client/liberty.provento.client';

describe('ProventoService', () => {
  let service: ProventoService;
  const client = {
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
    resumo: jest.fn(),
    importar: jest.fn(),
    alterarTipo: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProventoService,
        { provide: LibertyProventoClient, useValue: client },
      ],
    }).compile();
    service = module.get(ProventoService);
  });

  const request = {
    id_ativo: 1,
    tipo: 'DIVIDENDO',
    valor: 10.5,
    data_pagamento: '2026-11-01',
  };

  it('lança provento', async () => {
    client.criar.mockResolvedValue({ id: 1 });
    await expect(service.criar('tk', request)).resolves.toEqual({ id: 1 });
    expect(client.criar).toHaveBeenCalledWith('tk', request);
  });

  it('atualiza e remove provento', async () => {
    await service.atualizar('tk', '3', request);
    await service.deletar('tk', '3');
    expect(client.atualizar).toHaveBeenCalledWith('tk', '3', request);
    expect(client.deletar).toHaveBeenCalledWith('tk', '3');
  });

  it('busca resumo do ano', async () => {
    client.resumo.mockResolvedValue({ ano: 2026 });
    await service.resumo('tk', 2026);
    expect(client.resumo).toHaveBeenCalledWith('tk', 2026);
  });

  it('importa proventos com prévia e confirmação', async () => {
    client.importar.mockResolvedValue({ novos: 2 });
    await service.importar('tk', 12, false);
    await service.importar('tk', 12, true);
    expect(client.importar).toHaveBeenNthCalledWith(1, 'tk', 12, false);
    expect(client.importar).toHaveBeenNthCalledWith(2, 'tk', 12, true);
  });

  it('altera o tipo do provento', async () => {
    await service.alterarTipo('tk', '5', { tipo: 'JCP' });
    expect(client.alterarTipo).toHaveBeenCalledWith('tk', '5', { tipo: 'JCP' });
  });
});
