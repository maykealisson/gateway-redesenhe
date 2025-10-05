import { Injectable } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class EnvironmentVariables {
  @IsNotEmpty()
  @IsNumber()
  PORT: number;

  @IsNotEmpty()
  @IsString()
  ENV: string;
}

export function validateEnvironmentVariables(config: Record<string, unknown>) {
  const validateConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const erros = validateSync(validateConfig, {
    skipMissingProperties: false,
  });

  if (erros.length > 0) {
    throw new Error(erros.toString());
  }
  return validateConfig;
}
