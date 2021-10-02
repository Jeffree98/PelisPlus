import { Module } from '@nestjs/common';
import { PeliculaService } from './pelicula.service';
import { PeliculaController } from './pelicula.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeliculaEntity } from './pelicula.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PeliculaEntity])],
  providers: [PeliculaService], 
  controllers: [PeliculaController]
})
export class PeliculaModule { }
