import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { TrilhaRequest } from './trilha.request';

describe('TrilhaRequest', () => {
  it('deve aceitar trilha com itens validos', async () => {
    const errors = await validate(
      plainToInstance(TrilhaRequest, {
        nome: 'Estoicismo',
        itens: [{ titulo: 'Meditações', google_id: 'g1', ordem: 1 }],
      }),
    );
    expect(errors).toHaveLength(0);
  });

  it('deve rejeitar item sem titulo', async () => {
    const errors = await validate(
      plainToInstance(TrilhaRequest, { nome: 'T', itens: [{ ordem: 1 }] }),
    );
    expect(errors.map((e) => e.property)).toContain('itens');
  });

  it('deve rejeitar trilha sem nome', async () => {
    const errors = await validate(plainToInstance(TrilhaRequest, {}));
    expect(errors.map((e) => e.property)).toContain('nome');
  });
});
