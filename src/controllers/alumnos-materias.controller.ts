import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AlumnoMateria} from '../models';
import {AlumnoMateriaRepository} from '../repositories';

export class AlumnosMateriasController {
  constructor(
    @repository(AlumnoMateriaRepository)
    public alumnoMateriaRepository : AlumnoMateriaRepository,
  ) {}

  @post('/alumno-materias')
  @response(200, {
    description: 'AlumnoMateria model instance',
    content: {'application/json': {schema: getModelSchemaRef(AlumnoMateria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoMateria, {
            title: 'NewAlumnoMateria',
            exclude: ['Id'],
          }),
        },
      },
    })
    alumnoMateria: Omit<AlumnoMateria, 'Id'>,
  ): Promise<AlumnoMateria> {
    return this.alumnoMateriaRepository.create(alumnoMateria);
  }

  @get('/alumno-materias/count')
  @response(200, {
    description: 'AlumnoMateria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AlumnoMateria) where?: Where<AlumnoMateria>,
  ): Promise<Count> {
    return this.alumnoMateriaRepository.count(where);
  }

  @get('/alumno-materias')
  @response(200, {
    description: 'Array of AlumnoMateria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AlumnoMateria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AlumnoMateria) filter?: Filter<AlumnoMateria>,
  ): Promise<AlumnoMateria[]> {
    return this.alumnoMateriaRepository.find(filter);
  }

  @patch('/alumno-materias')
  @response(200, {
    description: 'AlumnoMateria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoMateria, {partial: true}),
        },
      },
    })
    alumnoMateria: AlumnoMateria,
    @param.where(AlumnoMateria) where?: Where<AlumnoMateria>,
  ): Promise<Count> {
    return this.alumnoMateriaRepository.updateAll(alumnoMateria, where);
  }

  @get('/alumno-materias/{id}')
  @response(200, {
    description: 'AlumnoMateria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlumnoMateria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(AlumnoMateria, {exclude: 'where'}) filter?: FilterExcludingWhere<AlumnoMateria>
  ): Promise<AlumnoMateria> {
    return this.alumnoMateriaRepository.findById(id, filter);
  }

  @patch('/alumno-materias/{id}')
  @response(204, {
    description: 'AlumnoMateria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlumnoMateria, {partial: true}),
        },
      },
    })
    alumnoMateria: AlumnoMateria,
  ): Promise<void> {
    await this.alumnoMateriaRepository.updateById(id, alumnoMateria);
  }

  @put('/alumno-materias/{id}')
  @response(204, {
    description: 'AlumnoMateria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() alumnoMateria: AlumnoMateria,
  ): Promise<void> {
    await this.alumnoMateriaRepository.replaceById(id, alumnoMateria);
  }

  @del('/alumno-materias/{id}')
  @response(204, {
    description: 'AlumnoMateria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alumnoMateriaRepository.deleteById(id);
  }
}
