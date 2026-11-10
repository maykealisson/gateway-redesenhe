export class Livro {
  id: number;
  nome: string;
  autor: string;
  data_publicacao: string;
  descricao: string;
  minha_opiniao: string;
  paginas: number;
  image_link: string;
  finalizado: boolean;
  ano_leitura: string;
  plano_leitura: string;
  version: number;
  avaliacao?: number | null;
  categorias?: string | null;
  google_id?: string | null;
}

export class LivroPage {
  content: Livro[];
  totalPages: number;
  totalElements: number;
  size: number;
}
