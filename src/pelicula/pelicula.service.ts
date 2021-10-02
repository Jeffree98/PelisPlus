import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListanotloginDto } from './dto/listanombres.dto';
import { PeliculaDto } from './dto/pelicula.dto';
import { PeliculaEntity } from './pelicula.entity';
import { PeliculaRepository } from './pelicula.repository';

@Injectable()
export class PeliculaService {

    constructor(
        @InjectRepository(PeliculaEntity) 
        private peliculaRepository: PeliculaRepository
    ){}

    async getAll():Promise<ListanotloginDto[]>{
        return await this.peliculaRepository.find();

    }
     
      async getfindbyID(estado: boolean){
        const filtro= await this.peliculaRepository.find({estado});
        if(!filtro.length){
            throw new NotFoundException({mesage: 'no hay peliculas mae'});

        }
        return filtro;
    }


    async createmovie(peliculanueva:PeliculaDto): Promise<PeliculaEntity>{
        const nuevo = new PeliculaEntity();
        nuevo.titulo = peliculanueva.titulo;
        nuevo.descripcion = peliculanueva.descripcion;
        nuevo.stock = peliculanueva.stock;
        nuevo.preciorenta = peliculanueva.preciorenta;
        nuevo.precioventa = peliculanueva.precioventa;
        nuevo.estado = peliculanueva.estado;

        return this.peliculaRepository.save(nuevo);

    }

   

    async updatemovies(idpelicula:number,peliculaup:PeliculaDto): Promise<PeliculaEntity>{
      const moviesup = await this.peliculaRepository.findOne(idpelicula); 
      
      moviesup.titulo = peliculaup.titulo;
      moviesup.preciorenta = peliculaup.preciorenta;
      moviesup.precioventa = peliculaup.precioventa;

      return await this.peliculaRepository.save(moviesup);
    }

 

    async deletemovies(idpelicula: number): Promise<any>{
        return await this.peliculaRepository.delete(idpelicula);
    }

     
//Para que los usuarios puedan ver las peliculas que estan disponibles por medio de una consulta sql
async find(): Promise<PeliculaDto[]>{
    return await this.peliculaRepository.query("listadisponible");


};


}
