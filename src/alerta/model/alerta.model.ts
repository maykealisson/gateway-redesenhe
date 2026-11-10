export interface IAlerta {
  id: number;
  id_ativo: number;
  ticket: string;
  tipo: string;
  valor?: number;
  habilitado: boolean;
  ultimo_valor_observado?: number;
  disparado_em?: string;
}
