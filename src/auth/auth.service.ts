import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { MessageDto } from 'src/common/message.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { Rolnombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { UsuarioEntity } from 'src/usuario/usuario.entity';
import { AuthRepository } from './auth.repository';
import { loginusuarioDto } from './dto/login.dto';
import { NuevousuarioDto } from './dto/nuevo-usuario.dto';
import { payloadInterface } from './payload.interface';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository:RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly authRepository: AuthRepository,
      private readonly jwtService:JwtService


    ){}

    async getall():Promise<UsuarioEntity[]>{
        const usuario = await this.authRepository.find();
        if(!usuario.length) throw new NotFoundException(new MessageDto('no hay usuarios, lo lamento'));
        return usuario;

    }

    async create(dto:NuevousuarioDto):Promise<any>{
        const {nombreUsuario} = dto;
        const exists = await this.authRepository.findOne({where:[{nombreUsuario:nombreUsuario}]});
        if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe')); 
        const rolUser = await this.rolRepository.findOne({where: {Rolnombre: Rolnombre.USER}});

        if(!rolUser) throw new InternalServerErrorException(new MessageDto('los roles no se crearon pe'));
        const user = this.authRepository.create(dto);
        user.roles = [rolUser];
        await this.authRepository.save(user);
        return new MessageDto('usuario creado');

    }

    async login(dto:loginusuarioDto):Promise<any>{
        const {nombreUsuario} = dto;
        const usuario = await this.authRepository.findOne({where: [{nombreUsuario:nombreUsuario}]});
        if(!usuario) return new UnauthorizedException(new MessageDto('no existe el usuario'));
        const passwordOK = await compare(dto.password, usuario.password);
        if(!passwordOK) return new UnauthorizedException(new MessageDto('contrasenia mala'));
        const payload: payloadInterface = {
            id: usuario.id,
            nombreUsuario:usuario.nombreUsuario,
            roles:usuario.roles.map(rol => rol.Rolnombre as Rolnombre)
        }
        const token = await this.jwtService.sign(payload);
        return{token};


    }




}
