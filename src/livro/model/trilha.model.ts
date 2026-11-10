export class TrilhaItem {
  id: number;
  livro_id: number | null;
  google_id: string | null;
  titulo: string;
  autor: string | null;
  ordem: number;
  image_link: string | null;
  na_biblioteca: boolean;
  finalizado: boolean;
}

export class Trilha {
  id: number;
  nome: string;
  tema: string | null;
  descricao: string | null;
  total: number;
  finalizados: number;
  /** finalizados / total, entre 0 e 1 */
  progresso: number;
  itens: TrilhaItem[];
}
