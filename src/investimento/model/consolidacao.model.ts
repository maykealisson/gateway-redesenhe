export interface IConsolidacaoCarteira {
  id: string;
  status: 'EM_PROCESSAMENTO' | 'CONCLUIDO' | 'FALHOU';
  inicio: string;
  fim?: string;
  mensagem?: string;
}
