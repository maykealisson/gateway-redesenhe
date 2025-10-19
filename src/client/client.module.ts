import { Module } from '@nestjs/common';
import { LibertyUsuarioClient } from './liberty.usuario.client';
import { LibertyLivroClient } from './liberty.livro.client';
import { LibertyInvestimentoClient } from './liberty.investimento.client';
import { RequestModule } from 'src/provider/request/request.module';
import { LibertyLivroNotaClient } from './liberty.livro.nota.client';
import { LibertyInvestimentoLancamentoClient } from './liberty.investimento.lancamento.client';
import { LibertyInvestimentoNotaClient } from './liberty.investimento.nota.client';

@Module({
  imports: [RequestModule],
  providers: [
    LibertyUsuarioClient,
    LibertyLivroClient,
    LibertyLivroNotaClient,
    LibertyInvestimentoClient,
    LibertyInvestimentoLancamentoClient,
    LibertyInvestimentoNotaClient,
  ],
  exports: [
    LibertyUsuarioClient,
    LibertyLivroClient,
    LibertyLivroNotaClient,
    LibertyInvestimentoClient,
    LibertyInvestimentoLancamentoClient,
    LibertyInvestimentoNotaClient,
  ],
})
export class ClientModule {}
