import { Module } from '@nestjs/common';
import { LibertyUsuarioClient } from './liberty.usuario.client';
import { LibertyLivroClient } from './liberty.livro.client';
import { LibertyInvestimentoClient } from './liberty.investimento.client';
import { RequestModule } from 'src/provider/request/request.module';
import { LibertyLivroNotaClient } from './liberty.livro.nota.client';
import { LibertyInvestimentoLancamentoClient } from './liberty.investimento.lancamento.client';
import { LibertyInvestimentoNotaClient } from './liberty.investimento.nota.client';
import { LibertyMetaClient } from './liberty.meta.client';
import { FinNewClient } from './fin-news.client';

@Module({
  imports: [RequestModule],
  providers: [
    LibertyUsuarioClient,
    LibertyLivroClient,
    LibertyLivroNotaClient,
    LibertyInvestimentoClient,
    LibertyInvestimentoLancamentoClient,
    LibertyInvestimentoNotaClient,
    LibertyMetaClient,
    FinNewClient,
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
  ],
})
export class ClientModule {}
