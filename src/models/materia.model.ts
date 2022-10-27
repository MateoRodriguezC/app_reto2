import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Profesor} from './profesor.model';
import {Alumno} from './alumno.model';
import {AlumnoMateria} from './alumno-materia.model';

@model()
export class Materia extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombre: string;

  @hasMany(() => Profesor)
  profesores: Profesor[];

  @hasMany(() => Alumno, {through: {model: () => AlumnoMateria}})
  alumnosasignados: Alumno[];

  constructor(data?: Partial<Materia>) {
    super(data);
  }
}

export interface MateriaRelations {
  // describe navigational properties here
}

export type MateriaWithRelations = Materia & MateriaRelations;
