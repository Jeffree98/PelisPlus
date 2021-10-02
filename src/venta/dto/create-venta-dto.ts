import { IsDate} from "class-validator";

export class CreateVentaDto {
    
    @IsDate()
    fecha_compra: Date;

}