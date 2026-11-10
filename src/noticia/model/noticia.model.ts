import { INoticiaItem } from 'src/investimento/model/investimento.model';

export interface INoticiaCarteira extends INoticiaItem {
  tickers: string[];
}

export interface INoticiasAtivo {
  ticker: string;
  total: number;
  noticias: INoticiaCarteira[];
  erro?: boolean;
}

export interface INoticiasCarteira {
  dias: number;
  total: number;
  ativos: INoticiasAtivo[];
}
