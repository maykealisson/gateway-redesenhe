import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class AnaliseRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500000)
  conteudo: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  nome_arquivo?: string;
}
