import { Module } from '@nestjs/common';
import { LivroService } from './livro.service';
import { LivroController } from './livro.controller';
import { LivroNotaController } from './livro.nota.controller';
import { ClientModule } from 'src/client/client.module';
import { LivroNotaService } from './livro.nota.service';
import { LivroTrilhaController } from './livro.trilha.controller';
import { LivroTrilhaService } from './livro.trilha.service';

@Module({
  imports: [ClientModule],
  providers: [LivroService, LivroNotaService, LivroTrilhaService],
  controllers: [LivroTrilhaController, LivroController, LivroNotaController],
})
export class LivroModule {}
