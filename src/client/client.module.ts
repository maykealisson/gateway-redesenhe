import { Module } from '@nestjs/common';
import { LibertyClient } from './liberty.client';
import { RequestService } from 'src/provider/request/request.service';

@Module({
  imports: [RequestService],
  providers: [LibertyClient],
})
export class ClientModule {}
