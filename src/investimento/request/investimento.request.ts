import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class InvestimentoRequest {
  @IsNotEmpty()
  @IsString()
  ticket: string;
  @IsOptional()
  @IsString()
  empresa?: string;
  @IsOptional()
  @IsString()
  moeda?: string;
  @IsNotEmpty()
  @IsString()
  segmento: string;
  @IsOptional()
  @IsBoolean()
  monitorado?: boolean;
  @IsOptional()
  @IsString()
  fundamento?: string;
}

export class InvestimentoUpdateRequest {
  @IsOptional()
  @IsString()
  empresa?: string;
  @IsOptional()
  @IsString()
  valor?: string;
  @IsOptional()
  @IsString()
  moeda?: string;
  @IsOptional()
  @IsBoolean()
  monitorado?: boolean;
  @IsOptional()
  @IsString()
  fundamento?: string;
  @IsNotEmpty()
  @IsNumber()
  versao: number;
}

export class InvestimentoLancamentoRequest {
  @IsNotEmpty()
  @IsString()
  operacao: string;
  @IsNotEmpty()
  @IsNumber()
  quantidade: number;
  @IsNotEmpty()
  @IsNumber()
  valor: number;
  @IsNotEmpty()
  @IsString()
  data_operacao: string;
}

export class InvestimentoNotaRequest {
  @IsNotEmpty()
  @IsString()
  note: string;
}
