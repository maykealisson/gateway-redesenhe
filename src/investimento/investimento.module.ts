import { Module } from '@nestjs/common';
import { InvestimentoController } from './investimento.controller';
import { InvestimentoService } from './investimento.service';

@Module({
  controllers: [InvestimentoController],
  providers: [InvestimentoService]
})
export class InvestimentoModule {}
