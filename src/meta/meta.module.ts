import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { MetaService } from './meta.service';
import { MetaController } from './meta.controller';

@Module({
  imports: [ClientModule],
  providers: [MetaService],
  controllers: [MetaController],
})
export class MetaModule {}
