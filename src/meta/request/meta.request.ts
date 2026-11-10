import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

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
  @IsOptional()
  @IsIn([
    'MANUAL',
    'LIVROS_LIDOS_ANO',
    'PATRIMONIO',
    'RENDA_PASSIVA_MENSAL',
    'APORTE_ACUMULADO',
  ])
  tipoVinculo?: string;
  @IsOptional()
  @IsIn(['NENHUMA', 'SEMANAL', 'MENSAL'])
  periodicidadeRevisao?: string;
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  especifico?: string;
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  mensuravel?: string;
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  relevancia?: string;
}
