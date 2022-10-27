import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Profesor, ProfesorRelations, Materia} from '../models';
import {MateriaRepository} from './materia.repository';

export class ProfesorRepository extends DefaultCrudRepository<
  Profesor,
  typeof Profesor.prototype.Id,
  ProfesorRelations
> {

  public readonly materias: HasManyRepositoryFactory<Materia, typeof Profesor.prototype.Id>;

  public readonly materia: BelongsToAccessor<Materia, typeof Profesor.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('MateriaRepository') protected materiaRepositoryGetter: Getter<MateriaRepository>,
  ) {
    super(Profesor, dataSource);
    this.materia = this.createBelongsToAccessorFor('materia', materiaRepositoryGetter,);
    this.registerInclusionResolver('materia', this.materia.inclusionResolver);
  }
}
