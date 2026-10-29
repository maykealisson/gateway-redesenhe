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

export class UsuarioUpdateEmailRequest {
  @IsNotEmpty()
  @IsString()
  novo_email: string;
}

export class UsuarioUpdateSenhaRequest {
  @IsNotEmpty()
  @IsString()
  senha_atual: string;
  @IsNotEmpty()
  @IsString()
  nova_senha: string;
}
