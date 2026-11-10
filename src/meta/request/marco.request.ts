import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class MarcoRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  nome: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  valorAlvo?: number;

  @IsOptional()
  @IsDateString()
  prazo?: string;

  @IsOptional()
  @IsBoolean()
  concluida?: boolean;
}
