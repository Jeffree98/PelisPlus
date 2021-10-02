import {  IsString } from "class-validator";
import { IsNotBlank } from "../decorators/notblanck.decorator";

export class PeliculaDto{ 

 @IsNotBlank ({message: 'esta chochada no puede estar vacio y debe ser un string'})  
readonly titulo: string;
    @IsString()
    readonly descripcion: string;

    readonly stock:number;
    
    readonly preciorenta:number;
    
    readonly precioventa:number;

    readonly estado:boolean;
}