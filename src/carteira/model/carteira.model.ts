export interface IAlocacaoAlvo {
  segmento: string;
  percentual: number;
}

export interface IAtivoSugerido {
  ticket: string;
  valor_total: number;
}

export interface ISegmentoRebalanceamento {
  segmento: string;
  valor_atual: number;
  percentual_atual: number;
  percentual_alvo: number;
  desvio: number;
  valor_sugerido: number;
  percentual_apos_aporte: number;
  ativos_sugeridos: IAtivoSugerido[];
}

export interface IRebalanceamento {
  patrimonio: number;
  aporte: number;
  alocacao_definida: boolean;
  segmentos: ISegmentoRebalanceamento[];
}

export interface IBenchmarkSerie {
  nome: string;
  disponivel: boolean;
  valores: (number | null)[] | null;
}

export interface IBenchmarks {
  datas: string[];
  series: IBenchmarkSerie[];
}
