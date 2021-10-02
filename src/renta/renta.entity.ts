import { PeliculaEntity } from "src/pelicula/pelicula.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'renta'})
export class RentaEntity{
    @PrimaryGeneratedColumn('increment')
    id_renta:number;

    @Column({type:'date'})
    fecha_out: Date;

    @Column({type:'date'})
    fecha_return: Date;
    
    @OneToOne(type => UsuarioEntity )
    @JoinColumn({name:"fk_usuario"})
    usuarioEntity:UsuarioEntity;


    @OneToOne(type => PeliculaEntity, peliculaEntity => peliculaEntity.rentaEntity)
    @JoinColumn({name:"fk_pelicula"})
    peliculaEntity:PeliculaEntity;

}