import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

export const SEGMENTOS = [
  'ACAO',
  'FII',
  'RENDA_FIXA',
  'ETF',
  'CAIXA',
  'STOCKS',
  'CRIPTO',
  'REITS',
];

export class AlocacaoAlvoItem {
  @IsIn(SEGMENTOS)
  segmento: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(100)
  percentual: number;
}

export class AlocacaoAlvoRequest {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AlocacaoAlvoItem)
  alocacoes: AlocacaoAlvoItem[];
}
