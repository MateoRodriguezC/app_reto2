import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Materia,
  Profesor,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaProfesorController {
  constructor(
    @repository(MateriaRepository) protected materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/profesors', {
    responses: {
      '200': {
        description: 'Array of Materia has many Profesor',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Profesor)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Profesor>,
  ): Promise<Profesor[]> {
    return this.materiaRepository.profesores(id).find(filter);
  }

  @post('/materias/{id}/profesors', {
    responses: {
      '200': {
        description: 'Materia model instance',
        content: {'application/json': {schema: getModelSchemaRef(Profesor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Materia.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {
            title: 'NewProfesorInMateria',
            exclude: ['Id'],
            optional: ['materiaId']
          }),
        },
      },
    }) profesor: Omit<Profesor, 'Id'>,
  ): Promise<Profesor> {
    return this.materiaRepository.profesores(id).create(profesor);
  }

  @patch('/materias/{id}/profesors', {
    responses: {
      '200': {
        description: 'Materia.Profesor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Profesor, {partial: true}),
        },
      },
    })
    profesor: Partial<Profesor>,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.materiaRepository.profesores(id).patch(profesor, where);
  }

  @del('/materias/{id}/profesors', {
    responses: {
      '200': {
        description: 'Materia.Profesor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Profesor)) where?: Where<Profesor>,
  ): Promise<Count> {
    return this.materiaRepository.profesores(id).delete(where);
  }
}
