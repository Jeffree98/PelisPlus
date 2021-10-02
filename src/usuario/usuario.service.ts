import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { RolEntity } from 'src/rol/rol.entity';
import { Rolnombre } from 'src/rol/rol.enum';
import { RolRepository } from 'src/rol/rol.repository';
import { CreateUSuarioDto } from './dto/usuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioRepository } from './usuario.repository';

@Injectable()
export class UsuarioService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository,
        @InjectRepository(UsuarioEntity)
        private readonly usuarioRepository: UsuarioRepository
        
    ) {}
    
        async getall():Promise<UsuarioEntity[]>{
            const usuario = await this.usuarioRepository.find();
            if(!usuario.length) throw new NotFoundException(new MessageDto  ('no hay usuarios, lo lamento'));
            return usuario;
    
        }
    
        async create(dto:CreateUSuarioDto):Promise<any>{
            const {nombreUsuario} = dto;
            const exists = await this.usuarioRepository.findOne({where:[{nombreUsuario:nombreUsuario}]});
            if(exists) throw new BadRequestException(new MessageDto('ese usuario ya existe')); 
            const rolAdmin = await this.rolRepository.findOne({where: {Rolnombre: Rolnombre.ADMIN}});
            const rolUser = await this.rolRepository.findOne({where: {Rolnombre: Rolnombre.USER}});
    
            if(!rolAdmin || !rolUser) throw new InternalServerErrorException(new MessageDto('los roles no se crearon pe'));
            const admin = this.usuarioRepository.create(dto);
            admin.roles = [rolAdmin, rolUser];
            await this.usuarioRepository.save(admin);
            return new MessageDto('admin creado');
    
        }
    

}
