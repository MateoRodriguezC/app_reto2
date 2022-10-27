import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Profesor,
  Materia,
} from '../models';
import {ProfesorRepository} from '../repositories';

export class ProfesorMateriaController {
  constructor(
    @repository(ProfesorRepository)
    public profesorRepository: ProfesorRepository,
  ) { }

  @get('/profesors/{id}/materia', {
    responses: {
      '200': {
        description: 'Materia belonging to Profesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Materia)},
          },
        },
      },
    },
  })
  async getMateria(
    @param.path.string('id') id: typeof Profesor.prototype.Id,
  ): Promise<Materia> {
    return this.profesorRepository.materia(id);
  }
}
