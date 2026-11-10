import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
import { NoticiaService } from './noticia.service';
import { INoticiasCarteira } from './model/noticia.model';

@UseGuards(AuthorizationHeaderGuard)
@Controller('v1/noticias')
export class NoticiaController {
  constructor(private readonly service: NoticiaService) {}

  @Get('carteira')
  async carteira(
    @Req() req,
    @Query('dias', new DefaultValuePipe(7), ParseIntPipe) dias: number,
  ): Promise<INoticiasCarteira> {
    const token = req.headers['authorization'].replace('Bearer ', '');
    return this.service.carteira(token, Math.min(Math.max(dias, 1), 90));
  }
}
