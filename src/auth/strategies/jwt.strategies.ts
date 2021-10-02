import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthRepository } from '../auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioRepository } from 'src/usuario/usuario.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/constants';
import { payloadInterface } from '../payload.interface';
import { MessageDto } from 'src/common/message.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor( 
      @InjectRepository(UsuarioEntity)
      private readonly authrepository:AuthRepository,
      private readonly configService:ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(JWT_SECRET )
    });
  }

  async validate(payload: payloadInterface) {

    const {nombreUsuario} = payload;
      const usuario = await this.authrepository.findOne({where: [{nombreUsuario:nombreUsuario}]});
      if(!usuario) return new UnauthorizedException(new MessageDto('estan malas esas credenciales mae'));
      return payload;

  }
}       