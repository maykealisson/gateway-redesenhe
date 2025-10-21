import { Module } from '@nestjs/common';
import { InvestimentoController } from './investimento.controller';
import { InvestimentoService } from './investimento.service';
import { ClientModule } from 'src/client/client.module';
import { InvestimentoLancamentoService } from './investimento.lancamento.service';
import { InvestimentoLancamentoController } from './investimento.lancamento.controller';
import { InvestimentoNotaService } from './investimento.nota.service';
import { InvestimentoNotaController } from './investimento.nota.controller';

@Module({
  imports: [ClientModule],
  controllers: [
    InvestimentoController,
    InvestimentoLancamentoController,
    InvestimentoNotaController,
  ],
  providers: [
    InvestimentoService,
    InvestimentoLancamentoService,
    InvestimentoNotaService,
  ],
})
export class InvestimentoModule {}
