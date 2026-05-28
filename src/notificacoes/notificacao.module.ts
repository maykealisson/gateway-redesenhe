import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';

@Module({
  imports: [ClientModule],
  providers: [NotificacaoService],
  controllers: [NotificacaoController],
})
export class NotificacaoModule {}
