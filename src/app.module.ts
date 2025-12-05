import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { validateEnvironmentVariables } from './provider/validator/env.validator';
import { UsuarioModule } from './usuario/usuario.module';
import { LivroModule } from './livro/livro.module';
import { InvestimentoModule } from './investimento/investimento.module';
import { RequestModule } from './provider/request/request.module';
import { ClientModule } from './client/client.module';
import { AuthModule } from './auth/auth.module';
import { MetaModule } from './meta/meta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateEnvironmentVariables,
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 6000000, // Time to live in milliseconds (e.g., 10minutes)
        limit: 100, // Maximum number of requests within the TTL
      },
    ]),
    UsuarioModule,
    AuthModule,
    LivroModule,
    InvestimentoModule,
    RequestModule,
    ClientModule,
    MetaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
