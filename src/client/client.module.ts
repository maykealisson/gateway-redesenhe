import { Module } from '@nestjs/common';
import { LibertyUsuarioClient } from './liberty.usuario.client';
import { LibertyLivroClient } from './liberty.livro.client';
import { RequestModule } from 'src/provider/request/request.module';

@Module({
  imports: [RequestModule],
  providers: [LibertyUsuarioClient, LibertyLivroClient],
  exports: [LibertyUsuarioClient, LibertyLivroClient],
})
export class ClientModule {}
