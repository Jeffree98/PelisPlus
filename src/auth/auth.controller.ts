import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginusuarioDto } from './dto/login.dto';
import { NuevousuarioDto } from './dto/nuevo-usuario.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService) {}
    @Get()
    getAll(){
    
        return this.authService.getall();
    
    }
    
    @UsePipes(new ValidationPipe({whitelist:true}))
    
    
    @Post()
    create(@Body() dto:NuevousuarioDto){
        return this.authService.create(dto);
    }
    

    
@UsePipes(new ValidationPipe({whitelist:true}))
@Post()
    login(@Body() dto:loginusuarioDto){
        return this.authService.login(dto);
    }





}
