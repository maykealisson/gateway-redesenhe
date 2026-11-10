export interface IProvento {
  id: number;
  id_ativo: number;
  ticket: string;
  moeda: string;
  tipo: string;
  valor: number;
  valor_real: number;
  data_pagamento: string;
  data_com?: string;
  observacao?: string;
  origem?: 'MANUAL' | 'YAHOO';
  verificar_tipo?: boolean;
  pagamento_estimado?: boolean;
  quantidade?: number;
  valor_por_cota?: number;
}

export interface IItemImportacao {
  ticket: string;
  id_ativo: number;
  moeda: string;
  data_ex: string;
  data_com: string;
  quantidade: number;
  valor_por_cota: number;
  valor: number;
  valor_real: number;
  verificar_tipo: boolean;
  status: 'NOVO' | 'JA_IMPORTADO' | 'POSSIVEL_DUPLICADO';
}

export interface IImportacaoProventos {
  confirmado: boolean;
  meses: number;
  novos: number;
  valor_novos: number;
  itens: IItemImportacao[];
  falhas: string[];
}

export interface IProventoMes {
  mes: number;
  total: number;
  por_tipo: Record<string, number>;
}

export interface IProventoPorAtivo {
  ticket: string;
  total_ano: number;
  total_12_meses: number;
  projecao_12_meses: number;
}

export interface IProventosResumo {
  ano: number;
  total_ano: number;
  total_12_meses: number;
  media_mensal_12_meses: number;
  yield_on_cost: number;
  projecao_12_meses: number;
  meses: IProventoMes[];
  por_ativo: IProventoPorAtivo[];
  proximos: IProvento[];
  lancamentos: IProvento[];
}
