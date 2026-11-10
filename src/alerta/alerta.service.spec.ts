import { Test, TestingModule } from '@nestjs/testing';
import { AlertaService } from './alerta.service';
import { LibertyAlertaClient } from '../client/liberty.alerta.client';

describe('AlertaService', () => {
  let service: AlertaService;
  const client = {
    listar: jest.fn(),
    criar: jest.fn(),
    atualizar: jest.fn(),
    deletar: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertaService,
        { provide: LibertyAlertaClient, useValue: client },
      ],
    }).compile();
    service = module.get(AlertaService);
  });

  const request = { id_ativo: 7, tipo: 'PRECO_ABAIXO', valor: 30 };

  it('lista alertas do ativo', async () => {
    client.listar.mockResolvedValue([]);
    await service.listar('tk', 7);
    expect(client.listar).toHaveBeenCalledWith('tk', 7);
  });

  it('cria, atualiza e remove alerta', async () => {
    await service.criar('tk', request);
    await service.atualizar('tk', '1', { ...request, habilitado: false });
    await service.deletar('tk', '1');
    expect(client.criar).toHaveBeenCalledWith('tk', request);
    expect(client.atualizar).toHaveBeenCalledWith('tk', '1', {
      ...request,
      habilitado: false,
    });
    expect(client.deletar).toHaveBeenCalledWith('tk', '1');
  });
});
