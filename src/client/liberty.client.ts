import { Injectable, Logger } from '@nestjs/common';
import { RequestService } from 'src/provider/request/request.service';

@Injectable()
export class LibertyClient {
  constructor(private readonly requestServer: RequestService) {}
  private readonly logger = new Logger(LibertyClient.name);
}
