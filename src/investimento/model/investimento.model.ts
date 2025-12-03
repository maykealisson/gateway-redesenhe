export interface ICarteira {
  data_atualizacao: string;
  valor: number;
  rentabilidade: IRenatabilidade;
  segmentos: ISegmentoPorcentagem[];
  moeda: IComposicaoPorcentagem[];
  quantidades: IComposicaoQuantidade[];
  ativos: IComposicaoPorcentagem[];
  moeda_segmento: IMoedaSegmento[];
  fundacao: IFundacao[];
}

export interface IRenatabilidade {
  valor: number;
  porcentagem: number;
}
export interface ISegmentoPorcentagem {
  segmento: string;
  porcentagem: number;
  valor: number;
}

export interface IComposicaoPorcentagem {
  nome: string;
  porcentagem: number;
}

export interface IComposicaoQuantidade {
  nome: string;
  quantidade: number;
}

export interface IActiveName {
  id: number;
  nome: string;
}

export interface IMoedaSegmento {
  moeda: string;
  segmentos: IComposicaoPorcentagem[];
}

export interface IFundacao {
  categoria: string;
  porcentagem: number;
}

export interface IInvestimentoItem {
  id: number;
  ticket: string;
  empresa: string;
  moeda: string;
  segmento: string;
  valor: number;
  quantidade: number;
  valor_medio: number;
  valor_investido: number;
  valor_total: number;
  porcentagem: number;
  monitorado: boolean;
  fundamento: string;
  versao: number;
}

export interface IInvestimento {
  content: IInvestimentoItem[];
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface ILancamentoItem {
  id: number;
  operacao: string;
  quantidade: number;
  valor: number;
  data_operacao: string;
}

export interface ILancamento {
  content: ILancamentoItem[];
  totalPages: number;
  totalElements: number;
  size: number;
}

export interface IAtivoNotaItem {
  id: number;
  nota: string;
  date_create: string;
}

export interface IAtivoNota {
  content: IAtivoNotaItem[];
  totalPages: number;
  totalElements: number;
  size: number;
}
