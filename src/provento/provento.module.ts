import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { ProventoController } from './provento.controller';
import { ProventoService } from './provento.service';

@Module({
  imports: [ClientModule],
  providers: [ProventoService],
  controllers: [ProventoController],
})
export class ProventoModule {}
