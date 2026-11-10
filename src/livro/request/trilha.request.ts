import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export class TrilhaItemRequest {
  @IsOptional()
  @IsInt()
  livro_id?: number | null;
  @IsOptional()
  @IsString()
  @MaxLength(40)
  google_id?: string | null;
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  titulo: string;
  @IsOptional()
  @IsString()
  @MaxLength(255)
  autor?: string | null;
  @IsOptional()
  @IsInt()
  ordem?: number | null;
}

export class TrilhaRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(120)
  nome: string;
  @IsOptional()
  @IsString()
  @MaxLength(120)
  tema?: string | null;
  @IsOptional()
  @IsString()
  descricao?: string | null;
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TrilhaItemRequest)
  itens?: TrilhaItemRequest[];
}
