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
AlumnoMateria,
Alumno,
} from '../models';
import {MateriaRepository} from '../repositories';

export class MateriaAlumnoController {
  constructor(
    @repository(MateriaRepository) protected materiaRepository: MateriaRepository,
  ) { }

  @get('/materias/{id}/alumnos', {
    responses: {
      '200': {
        description: 'Array of Materia has many Alumno through AlumnoMateria',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Alumno)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Alumno>,
  ): Promise<Alumno[]> {
    return this.materiaRepository.alumnosasignados(id).find(filter);
  }

  @post('/materias/{id}/alumnos', {
    responses: {
      '200': {
        description: 'create a Alumno model instance',
        content: {'application/json': {schema: getModelSchemaRef(Alumno)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Materia.prototype.Id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {
            title: 'NewAlumnoInMateria',
            exclude: ['Id'],
          }),
        },
      },
    }) alumno: Omit<Alumno, 'Id'>,
  ): Promise<Alumno> {
    return this.materiaRepository.alumnosasignados(id).create(alumno);
  }

  @patch('/materias/{id}/alumnos', {
    responses: {
      '200': {
        description: 'Materia.Alumno PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alumno, {partial: true}),
        },
      },
    })
    alumno: Partial<Alumno>,
    @param.query.object('where', getWhereSchemaFor(Alumno)) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.materiaRepository.alumnosasignados(id).patch(alumno, where);
  }

  @del('/materias/{id}/alumnos', {
    responses: {
      '200': {
        description: 'Materia.Alumno DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Alumno)) where?: Where<Alumno>,
  ): Promise<Count> {
    return this.materiaRepository.alumnosasignados(id).delete(where);
  }
}
