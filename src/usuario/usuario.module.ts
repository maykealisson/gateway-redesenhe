import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
