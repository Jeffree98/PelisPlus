import { RentaEntity } from "src/renta/renta.entity";
import { VentaEntity } from "src/venta/venta.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'pelicula'})
export class PeliculaEntity{

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'varchar', length:35})

    titulo: string;

    @Column({type:'varchar', length:255})

    descripcion: string;
  
    @Column({type:'int'})
    stock: number;

    @Column({type:'float'})
    preciorenta:number;

    @Column({type:'float'})
    precioventa:number;

    @Column({type:'boolean'})
    estado:boolean;

    @OneToOne(type => RentaEntity, rentaEntity => rentaEntity.peliculaEntity)
    rentaEntity:RentaEntity;

    @OneToOne(type => VentaEntity, ventaEntity => ventaEntity.peliculaEntity)
    ventaEntity:VentaEntity;


   
}