import { Module } from '@nestjs/common';
import { ClientModule } from 'src/client/client.module';
import { CarteiraController } from './carteira.controller';
import { CarteiraService } from './carteira.service';

@Module({
  imports: [ClientModule],
  providers: [CarteiraService],
  controllers: [CarteiraController],
})
export class CarteiraModule {}
