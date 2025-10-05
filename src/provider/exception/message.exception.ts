export const MessageException = {
  NOT_ACCESS: 'Email ou senha invalida!',
  user: {
    NOT_FOUND: 'Usuário não encontrado!',
    PASSWORD_DIFF: `Senha e confirmação de senha diferentes!`,
    EMAIL_ALREADY: `Email já cadastrado!`,
    OLD_PASSWORD_INVALID: 'Senha antiga invalida!',
    NOT_FOUND_ID: (id: number) => {
      return `Não foi encontrado usuario com o id #${id}`;
    },
  },
  client: {
    NOT_FOUND_ID: (id: number) => {
      return `Não foi encontrado cliente com o id #${id} para seu usuario`;
    },
  },
  product: {
    NOT_FOUND_ID: (id: number) => {
      return `Não foi encontrado produto com o id #${id} para seu usuario`;
    },
  },
  launch: {
    NOT_FOUND: 'Lançamento não encontrado!',
    NOT_FOUND_ID_TO_USER: (id: number) => {
      return `Não foi encontrado lançamento com o id #${id} para seu usuario`;
    },
  },
};
