import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class RevisaoRequest {
  @IsOptional()
  @IsNumber()
  @Min(0)
  progresso?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  confianca?: number;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  oQueFuncionou?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bloqueios?: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  proximoPasso?: string;
}
