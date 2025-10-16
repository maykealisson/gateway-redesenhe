import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  providers: [LivroService],
  controllers: [LivroController],
})
export class LivroModule {}
