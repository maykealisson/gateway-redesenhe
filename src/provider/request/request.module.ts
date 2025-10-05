import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [RequestService],
})
export class RequestModule {}
