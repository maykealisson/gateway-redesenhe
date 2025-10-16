import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironmentVariables } from './provider/validator/env.validator';
import { UsuarioModule } from './usuario/usuario.module';
import { LivroModule } from './livro/livro.module';
import { InvestimentoModule } from './investimento/investimento.module';
import { RequestModule } from './provider/request/request.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
    }),
    UsuarioModule,
    AuthModule,
    LivroModule,
    InvestimentoModule,
    RequestModule,
    ClientModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
