import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUSuarioDto } from './dto/usuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {


    constructor(private readonly usuarioServices: UsuarioService){}

    @Get()
    getAll(){

        return this.usuarioServices.getall();

    }

    @UsePipes(new ValidationPipe({whitelist:true}))


    @Post()
    create(@Body() dto:CreateUSuarioDto){
        return this.usuarioServices.create(dto);
    }


}
