import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { LibertyUsuarioClient } from './liberty.usuario.client';
import { LibertyLivroClient } from './liberty.livro.client';
import { LibertyInvestimentoClient } from './liberty.investimento.client';
import { RequestModule } from 'src/provider/request/request.module';
import { LibertyLivroNotaClient } from './liberty.livro.nota.client';
import { LibertyInvestimentoLancamentoClient } from './liberty.investimento.lancamento.client';
import { LibertyInvestimentoNotaClient } from './liberty.investimento.nota.client';
import { LibertyMetaClient } from './liberty.meta.client';
import { FinNewClient } from './fin-news.client';
import { LibertyNotificacaoClient } from './liberty.notificacao.client';
import { AgentFundamentClient } from './agent-fundament.client';
import { LibertyCarteiraClient } from './liberty.carteira.client';
import { LibertyProventoClient } from './liberty.provento.client';
import { LibertyAlertaClient } from './liberty.alerta.client';
import { LibertyMetaAcompanhamentoClient } from './liberty.meta.acompanhamento.client';

@Module({
  imports: [RequestModule, HttpModule],
  providers: [
    LibertyUsuarioClient,
    LibertyLivroClient,
    LibertyLivroNotaClient,
    LibertyInvestimentoClient,
    LibertyInvestimentoLancamentoClient,
    LibertyInvestimentoNotaClient,
    LibertyMetaClient,
    FinNewClient,
    LibertyNotificacaoClient,
    AgentFundamentClient,
    LibertyCarteiraClient,
    LibertyProventoClient,
    LibertyAlertaClient,
    LibertyMetaAcompanhamentoClient,
  ],
  exports: [
    LibertyUsuarioClient,
    LibertyLivroClient,
    LibertyLivroNotaClient,
    LibertyInvestimentoClient,
    LibertyInvestimentoLancamentoClient,
    LibertyInvestimentoNotaClient,
    LibertyMetaClient,
    FinNewClient,
    LibertyNotificacaoClient,
    AgentFundamentClient,
    LibertyCarteiraClient,
    LibertyProventoClient,
    LibertyAlertaClient,
    LibertyMetaAcompanhamentoClient,
  ],
})
export class ClientModule {}
