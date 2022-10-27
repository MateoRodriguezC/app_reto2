import {Entity, model, property} from '@loopback/repository';

@model()
export class AlumnoMateria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
  })
  materiaId?: string;

  @property({
    type: 'string',
  })
  alumnoId?: string;

  constructor(data?: Partial<AlumnoMateria>) {
    super(data);
  }
}

export interface AlumnoMateriaRelations {
  // describe navigational properties here
}

export type AlumnoMateriaWithRelations = AlumnoMateria & AlumnoMateriaRelations;
