import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Materia, MateriaRelations, Profesor, Alumno, AlumnoMateria} from '../models';
import {ProfesorRepository} from './profesor.repository';
import {AlumnoRepository} from './alumno.repository';
import {AlumnoMateriaRepository} from './alumno-materia.repository';

export class MateriaRepository extends DefaultCrudRepository<
  Materia,
  typeof Materia.prototype.Id,
  MateriaRelations
> {

  public readonly profesores: HasManyRepositoryFactory<Profesor, typeof Materia.prototype.Id>;

  public readonly alumnosasignados: HasManyThroughRepositoryFactory<Alumno, typeof Alumno.prototype.Id,
          AlumnoMateria,
          typeof Materia.prototype.Id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProfesorRepository') protected profesorRepositoryGetter: Getter<ProfesorRepository>, @repository.getter('AlumnoRepository') protected alumnoRepositoryGetter: Getter<AlumnoRepository>, @repository.getter('AlumnoMateriaRepository') protected alumnoMateriaRepositoryGetter: Getter<AlumnoMateriaRepository>,
  ) {
    super(Materia, dataSource);
    this.alumnosasignados = this.createHasManyThroughRepositoryFactoryFor('alumnosasignados', alumnoRepositoryGetter, alumnoMateriaRepositoryGetter,);
    this.registerInclusionResolver('alumnosasignados', this.alumnosasignados.inclusionResolver);
    this.profesores = this.createHasManyRepositoryFactoryFor('profesores', profesorRepositoryGetter,);
    this.registerInclusionResolver('profesores', this.profesores.inclusionResolver);
  }
}
