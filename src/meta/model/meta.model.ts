export class Meta {
  nome: string | undefined;
  descricao: string | undefined;
  categoria: string | undefined;
  valor: string | undefined;
  valorAtual: string | undefined;
  porcentagemConclusao: number | undefined;
  dataConclusao: string | undefined;
  version: number | undefined;
  tipoVinculo?: string;
  periodicidadeRevisao?: string;
  especifico?: string;
  mensuravel?: string;
  relevancia?: string;
  dataInicio?: string;
  ritmo?: IRitmo;
  marcos?: IMarco[];
  ultimaRevisao?: string;
  revisaoPendente?: boolean;
}

export interface IRitmo {
  status: 'CONCLUIDA' | 'NO_RITMO' | 'ATRASADA' | 'PARADA' | 'SEM_DADOS';
  ritmoPorMes?: number;
  dataProjetada?: string;
  diasDiferenca?: number;
  valorNecessarioPorMes?: number;
  prazo?: string;
}

export interface IMarco {
  id: number;
  nome: string;
  valorAlvo?: number;
  prazo?: string;
  concluida: boolean;
  atrasado: boolean;
}

export interface IRevisao {
  id: number;
  idMeta: number;
  data: string;
  progresso?: number;
  confianca?: number;
  oQueFuncionou?: string;
  bloqueios?: string;
  proximoPasso?: string;
}
