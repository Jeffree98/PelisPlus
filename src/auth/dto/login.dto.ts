import { MaxLength } from "class-validator";
import { IsNotBlank } from "src/pelicula/decorators/notblanck.decorator";


export class loginusuarioDto {
   
    @IsNotBlank(    {message: 'nombre de usuario no puede estar vacio, con que pelotas vas acceder despues?'})

    @MaxLength(20, {message: 'nombreUsuario: longitud es de 20, escoge algo corto ese nombre, sos cocodrilo acaso?'})

    nombreUsuario: string; 

    @IsNotBlank({message: 'la contrasenia no puede estar vacio, con que pelotas vas acceder despues?'})

    password:string;

    
}