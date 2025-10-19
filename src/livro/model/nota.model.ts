export interface Nota {
  id: number;
  nota: string;
  autor: string;
  livro: string;
}

export interface NotaPage {
  content: Nota[];
  totalPages: number;
  totalElements: number;
  size: number;
}
