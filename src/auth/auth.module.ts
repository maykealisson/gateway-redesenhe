import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthorizationHeaderGuard } from 'src/auth/guards/authorization-header.guard';
const configService = new ConfigService();

ConfigModule.forRoot({
  envFilePath: '.env',
});

@Module({
  imports: [PassportModule],
  providers: [AuthorizationHeaderGuard],
})
export class AuthModule {}
