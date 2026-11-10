import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { NoticiaController } from './noticia.controller';
import { NoticiaService } from './noticia.service';

@Module({
  imports: [ClientModule],
  providers: [NoticiaService],
  controllers: [NoticiaController],
})
export class NoticiaModule {}
