import { IsDate} from "class-validator";

export class RentaPeliculaDto {
    
    @IsDate()
    fecha_out: Date;

    @IsDate()
    fecha_return: Date;
    
}