import { IsString, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';
export class LivroRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsString()
  date_of_publication: string;
  @IsString()
  description: string;
  @IsNumber()
  pages: number;
  @IsString()
  image_link: string;
}

export class LivroUpdateRequest {
  @IsString()
  descricao: string;
  @IsString()
  minha_opiniao: string;
  @IsString()
  image_link: string;
  @IsBoolean()
  finalizado: boolean;
  @IsString()
  ano_leitura: string;
  @IsString()
  plano_leitura: string;
  @IsNumber()
  version: number;
}
