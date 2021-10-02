import { PeliculaEntity } from "src/pelicula/pelicula.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'venta'})
export class VentaEntity{
    @PrimaryGeneratedColumn('increment')
    id_venta:number;

    @Column({type:'date'})
    fecha_compra: Date;

    @OneToOne(type => UsuarioEntity )
    @JoinColumn({name:"fk_usuario"})
    usuarioEntity:UsuarioEntity;


    @OneToOne(type => PeliculaEntity, peliculaEntity => peliculaEntity.ventaEntity)
    @JoinColumn({name:"fk_pelicula"})
    peliculaEntity:PeliculaEntity;


}