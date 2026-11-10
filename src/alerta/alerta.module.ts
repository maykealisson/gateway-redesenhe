import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { AlertaController } from './alerta.controller';
import { AlertaService } from './alerta.service';

@Module({
  imports: [ClientModule],
  providers: [AlertaService],
  controllers: [AlertaController],
})
export class AlertaModule {}
