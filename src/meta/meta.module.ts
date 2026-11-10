import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { MetaService } from './meta.service';
import { MetaController } from './meta.controller';
import { MetaAcompanhamentoController } from './meta.acompanhamento.controller';

@Module({
  imports: [ClientModule],
  providers: [MetaService],
  controllers: [MetaController, MetaAcompanhamentoController],
})
export class MetaModule {}
