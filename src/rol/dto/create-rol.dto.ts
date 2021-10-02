import { Rolnombre } from "../rol.enum";
import {IsEnum} from "class-validator";

export class createRoldto{


    @IsEnum(Rolnombre, {message:'el rol solo puede user o admin papaya loca'})
    rolnombre:string;

}