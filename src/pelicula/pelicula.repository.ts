import { EntityRepository, Repository } from "typeorm";
import { PeliculaEntity } from "./pelicula.entity";

@EntityRepository(PeliculaEntity)
export class PeliculaRepository extends Repository<PeliculaEntity>{}