import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageDto } from 'src/common/message.dto';
import { createRoldto } from './dto/create-rol.dto';
import { RolEntity } from './rol.entity';
import { RolRepository } from './rol.repository';

@Injectable()
export class RolService {

    constructor(
        @InjectRepository(RolEntity)
        private readonly rolRepository: RolRepository
        
    ) {}
    
    async getAll():Promise<RolEntity[]>{
        return await this.rolRepository.find();

    }
    
        async create(dto: createRoldto):Promise<any>{
            const exists = await this.rolRepository.findOne({where:{ Rolnombre: dto.rolnombre}});
            if(exists) throw new BadRequestException(new MessageDto('ese rol ya esta creado'));
            await this.rolRepository.save(dto as unknown as RolEntity);
                    return new MessageDto('rol creado');    
        }



}
