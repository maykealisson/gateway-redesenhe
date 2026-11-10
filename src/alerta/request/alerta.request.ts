import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';

export class AlertaRequest {
  @IsInt()
  id_ativo: number;

  @IsIn(['PRECO_ABAIXO', 'PRECO_ACIMA', 'ABAIXO_PRECO_JUSTO', 'SCORE_CAIU'])
  tipo: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  valor?: number;

  @IsOptional()
  @IsBoolean()
  habilitado?: boolean;
}
