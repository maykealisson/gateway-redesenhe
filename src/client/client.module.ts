import { Module } from '@nestjs/common';
import { LibertyClient } from './liberty.client';
import { RequestModule } from 'src/provider/request/request.module';

@Module({
  imports: [RequestModule],
  providers: [LibertyClient],
  exports: [LibertyClient],
})
export class ClientModule {}
