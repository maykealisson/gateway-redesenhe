import { Controller, Post, Req, Body } from '@nestjs/common';

@Controller('livros')
export class LivroController {
  @Post()
  async create(
    @Req() req,
    @Body() payload: ,
  ): Promise<AcessoModel> {
    return this.usuarioService.criar(req.headers, payload);
  }
}
