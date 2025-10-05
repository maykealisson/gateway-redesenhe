import { IsString, IsNotEmpty } from 'class-validator';

export class UsuarioRequest {
  @IsNotEmpty()
  @IsString()
  nome: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  senha: string;
}
