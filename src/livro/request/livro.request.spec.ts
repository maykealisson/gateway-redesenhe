import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { LivroUpdateRequest } from './livro.request';

describe('LivroUpdateRequest', () => {
  const base = {
    descricao: 'Desc',
    minha_opiniao: 'Op',
    image_link: 'link',
    finalizado: false,
    ano_leitura: '',
    version: 1,
    nome: 'Livro',
    autor: 'Autor',
    data_publicacao: '2020-01-01',
    paginas: 100,
  };

  const errosPlanoLeitura = async (body: object) => {
    const errors = await validate(plainToInstance(LivroUpdateRequest, body));
    return errors.filter((e) => e.property === 'plano_leitura');
  };

  it('deve aceitar plano_leitura nulo', async () => {
    expect(await errosPlanoLeitura({ ...base, plano_leitura: null })).toHaveLength(0);
  });

  it('deve aceitar sem plano_leitura', async () => {
    expect(await errosPlanoLeitura(base)).toHaveLength(0);
  });

  it('deve aceitar plano_leitura informado', async () => {
    expect(await errosPlanoLeitura({ ...base, plano_leitura: '2027' })).toHaveLength(0);
  });

  it('deve rejeitar plano_leitura que nao seja texto', async () => {
    expect(await errosPlanoLeitura({ ...base, plano_leitura: 2027 })).toHaveLength(1);
  });
});
