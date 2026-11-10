import {
  IsDateString,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class ProventoRequest {
  @IsInt()
  id_ativo: number;

  @IsIn(['DIVIDENDO', 'JCP', 'RENDIMENTO', 'OUTRO'])
  tipo: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  valor: number;

  @IsDateString()
  data_pagamento: string;

  @IsOptional()
  @IsDateString()
  data_com?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  observacao?: string;
}

export class AlterarTipoRequest {
  @IsIn(['DIVIDENDO', 'JCP', 'RENDIMENTO', 'OUTRO'])
  tipo: string;
}
