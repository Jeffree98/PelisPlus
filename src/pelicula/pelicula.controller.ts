import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { response } from 'express';
import { resolve } from 'path/posix';
import { retry } from 'rxjs';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { RolesGuard } from 'src/guards/rol.guard';
import { Rolnombre } from 'src/rol/rol.enum';
import { RolDecorator } from './decorators/roles.decorator';
import { PeliculaDto } from './dto/pelicula.dto';
import { PeliculaService } from './pelicula.service';

@Controller('pelicula')
export class PeliculaController {

    constructor(private readonly peliculaService:PeliculaService){}


    @RolDecorator(Rolnombre.ADMIN)
    @UseGuards(JwtAuthGuard,RolesGuard)    
    @Post()
        create( @Body() CreateMovieDto: PeliculaDto, @Res() response){
            this.peliculaService.createmovie(CreateMovieDto).then(PeliculaEntity =>{
                response.status(HttpStatus.CREATED).json(PeliculaEntity);
            }
    
            ).catch( ()=>{
                response.status(HttpStatus.FORBIDDEN).json({movie: 'No se pudo agregar la movie'});
    
            });
        }
    
        @RolDecorator(Rolnombre.ADMIN)
        @UseGuards(JwtAuthGuard,RolesGuard)   
        @Put(':id')
        update(@Body()  updateMovieDto: PeliculaDto, @Res() response, @Param('id') Idmovie){
            this.peliculaService.updatemovies(Idmovie, updateMovieDto).then( PeliculaEntity =>{
                response.status(HttpStatus.OK).json(PeliculaEntity);
            }).catch(() =>{
                response.status(HttpStatus.FORBIDDEN).json({movie:'error en la actualizacion de las movies'});
    
            })
            }



        @RolDecorator(Rolnombre.ADMIN)
        @UseGuards(JwtAuthGuard,RolesGuard)   
        @Delete(':id')
        delete(@Res() response, @Param('id') Idmovie){
            this.peliculaService.deletemovies(Idmovie).then(res => {
                response.status(HttpStatus.OK).json(res);
            }).catch(() => {
                response.status(HttpStatus.FORBIDDEN).json({movie:'error en la eliminacion de la movie'});
    
            })
        }

        @RolDecorator(Rolnombre.ADMIN)
        @UseGuards(JwtAuthGuard,RolesGuard)   
        @Get(':estado')  //Estado significa si esta disponible, con esto solo obtenemos las peliculas segun el 1 o 0 que le pasemos 100 real no fake
        findavailability(@Res() response, @Param('estado') estado:boolean){
           return this.peliculaService.getfindbyID(estado) .then(movieslist =>{
              response.status(HttpStatus.OK).json(movieslist);
  
          }).catch(() =>{
              response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtencion prix'});
  
  
          });
  
      }

      //Para que los usuarios puedan ver las peliculas disponibles
      @RolDecorator(Rolnombre.USER)
        @UseGuards(JwtAuthGuard,RolesGuard)  
      @Get()
      find(@Res() response){
          return this.peliculaService.find().then(movieslist =>{
            response.status(HttpStatus.OK).json(movieslist);

        }).catch(() =>{
            response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtencion prix'});


        });


      }


      //EveryOne can view List a MOVIES
      @Get()
      getAll(@Res() response)
      {
          this.peliculaService.getAll().then(mensajeslist =>{
              response.status(HttpStatus.OK).json(mensajeslist);
  
          }).catch(() =>{
              response.status(HttpStatus.FORBIDDEN).json({mensaje: 'error en la obtencion prix'});
          });
        }
    }
