import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {AlumnoMateria, AlumnoMateriaRelations} from '../models';

export class AlumnoMateriaRepository extends DefaultCrudRepository<
  AlumnoMateria,
  typeof AlumnoMateria.prototype.Id,
  AlumnoMateriaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(AlumnoMateria, dataSource);
  }
}
