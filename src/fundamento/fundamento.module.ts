import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { FundamentoController } from './fundamento.controller';
import { FundamentoService } from './fundamento.service';

@Module({
  imports: [ClientModule],
  controllers: [FundamentoController],
  providers: [FundamentoService],
})
export class FundamentoModule {}
