import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { LibertyUsuarioClient } from '../client/liberty.usuario.client';
import { RequestService } from '../provider/request/request.service';

describe('Cadastro de usuário', () => {
  let app: NestFastifyApplication;
  const upstream = { post: jest.fn() };
  const legado = {
    nome: 'Cliente',
    email: 'cliente@example.com',
    senha: 'senha123',
  };
  const acesso = {
    nome: 'Cliente',
    token: 'token-local',
    expiracao: '2026-10-17T20:00:00',
  };
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [
        UsuarioService,
        LibertyUsuarioClient,
        { provide: RequestService, useValue: upstream },
      ],
    }).compile();
    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    app.setGlobalPrefix('gateway');
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });
  beforeEach(() => jest.clearAllMocks());
  afterAll(async () => app.close());

  it('encaminha o cadastro para o Liberty', async () => {
    upstream.post.mockResolvedValue(acesso);
    const response = await app.inject({
      method: 'POST',
      url: '/gateway/v1/usuarios',
      payload: legado,
    });
    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(acesso);
    expect(upstream.post).toHaveBeenCalledWith(
      expect.stringContaining('/v1/usuarios'),
      legado,
    );
  });

  it('rejeita campos fora do contrato de cadastro', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/gateway/v1/usuarios',
      payload: { ...legado, email_verificado: true },
    });
    expect(response.statusCode).toBe(400);
    expect(upstream.post).not.toHaveBeenCalled();
  });

  it('repassa a reprovação do Liberty', async () => {
    upstream.post.mockRejectedValue({
      status: 400,
      message: 'Confirme seu e-mail',
    });
    const response = await app.inject({
      method: 'POST',
      url: '/gateway/v1/usuarios',
      payload: legado,
    });
    expect(response.statusCode).toBe(400);
  });
});
