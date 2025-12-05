import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MetaRequest {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsString()
  descricao: string;
  @IsNotEmpty()
  @IsString()
  categoria: string;
  @IsNotEmpty()
  @IsString()
  valor: string;
  @IsNotEmpty()
  @IsString()
  valorAtual: string;
  @IsNotEmpty()
  @IsString()
  dataConclusao: string;
  @IsOptional()
  @IsNumber()
  version?: number;
}
