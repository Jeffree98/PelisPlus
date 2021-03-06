import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { RolEntity } from 'src/rol/rol.entity';
import { AuthRepository } from './auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_SECRET } from 'src/config/constants';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  imports:[TypeOrmModule.forFeature([UsuarioEntity,RolEntity,AuthRepository]),

  PassportModule.register({
    defaultStrategy:'jwt'
  }),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get(JWT_SECRET),
      signOptions:{
        expiresIn:7200
      }
    }),
    inject: [ConfigService],
  }),



],
  providers: [AuthService, ConfigService, JwtStrategy],
  controllers: [AuthController],
  exports:[PassportModule,JwtStrategy]
})
export class AuthModule {}
