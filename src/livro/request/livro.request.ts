import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
export class LivroRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsOptional()
  @IsString()
  date_of_publication?: string;
  @IsString()
  description: string;
  @IsNumber()
  pages: number;
  @IsString()
  image_link: string;
  @IsOptional()
  @IsString()
  google_id?: string | null;
  @IsOptional()
  @IsString()
  categories?: string | null;
}

export class LivroUpdateRequest {
  @IsString()
  descricao: string;
  @IsString()
  minha_opiniao: string;
  @IsString()
  image_link: string;
  @IsBoolean()
  @IsOptional()
  finalizado?: boolean;
  @IsString()
  ano_leitura: string;
  @IsOptional()
  @IsString()
  plano_leitura?: string | null;
  @IsNumber()
  version: number;
  @IsString()
  nome: string;
  @IsString()
  autor: string;
  @IsString()
  data_publicacao: string;
  @IsNumber()
  paginas: number;
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  avaliacao?: number | null;
  @IsOptional()
  @IsString()
  categorias?: string | null;
  @IsOptional()
  @IsString()
  google_id?: string | null;
}
export class LivroNoteRequest {
  @IsString()
  @IsNotEmpty()
  note: string;
}
