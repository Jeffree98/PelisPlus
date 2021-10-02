import { Body, Controller, Get, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { response } from 'express';
import { createRoldto } from './dto/create-rol.dto';
import { RolService } from './rol.service';

@Controller('rol')
export class RolController {

    constructor(private readonly rolservices:RolService){}

    @Get()
    getAll(){

        this.rolservices.getAll().then(mensajeslist =>{
            response.status(HttpStatus.OK).json(mensajeslist);

        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({message: 'error en la obtencion prix'});


        });

    }

    @Post()
    create(@Body() dto:createRoldto){
        return this.rolservices.create(dto);
    }



}
