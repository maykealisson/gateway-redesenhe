export interface IAnaliseResumo {
  id: number;
  ticker: string;
  empresa: string | null;
  data_analise: string;
  periodo_referencia: string | null;
  preco: number | null;
  valor_intrinseco: number | null;
  margem_seguranca: number | null;
  nota_checklist: number | null;
  veredito_qualidade: string | null;
  veredito_preco: string | null;
  tese: string | null;
  nome_arquivo: string | null;
  criado_em: string | null;
}

export interface IAnaliseUpload extends IAnaliseResumo {
  substituida: boolean;
}

export interface IPontoRelatorio {
  texto: string;
  origem: 'analise' | 'processamento';
}

// Estrutura completa documentada no README do agent-fundament
export interface IRelatorioAnalise {
  ticker: string;
  empresa: string | null;
  data_processamento: string;
  analise_base: IAnaliseResumo & { dias_desde_analise: number };
  total_analises: number;
  preco: Record<string, number | string | null>;
  preco_justo: Record<string, unknown>;
  recomendacao: { acao: string; descricao: string };
  qualidade: Record<string, unknown>;
  value_investing: Record<string, number | null>;
  mercado_hoje: Record<string, unknown> | null;
  tese: string | null;
  pontos_positivos: IPontoRelatorio[];
  pontos_atencao: IPontoRelatorio[];
  riscos: string[];
  gatilhos_saida: string[];
  dados_a_conferir: string[];
  comparacao_anterior: Record<string, unknown> | null;
  evolucao: Record<string, unknown>[];
  historico: Record<string, number | null>[];
  avisos: string[];
  [chave: string]: unknown;
}
