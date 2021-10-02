import { UsuarioEntity } from "src/usuario/usuario.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Rolnombre } from "./rol.enum";

@Entity({name:'rol'})
export class RolEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({type:'varchar', length:15, nullable:false, unique:true})
    Rolnombre:Rolnombre;

    @ManyToMany( type => UsuarioEntity, usuario => usuario.roles)

    usuarios: UsuarioEntity[];
        

}