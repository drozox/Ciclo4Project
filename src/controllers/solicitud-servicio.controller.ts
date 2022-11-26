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
import {SolicitudSevicio} from '../models';
import {SolicitudSevicioRepository} from '../repositories';

export class SolicitudServicioController {
  constructor(
    @repository(SolicitudSevicioRepository)
    public solicitudSevicioRepository : SolicitudSevicioRepository,
  ) {}

  @post('/solicitud-sevicios')
  @response(200, {
    description: 'SolicitudSevicio model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudSevicio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudSevicio, {
            title: 'NewSolicitudSevicio',
            exclude: ['Id'],
          }),
        },
      },
    })
    solicitudSevicio: Omit<SolicitudSevicio, 'id'>,
  ): Promise<SolicitudSevicio> {
    return this.solicitudSevicioRepository.create(solicitudSevicio);
  }

  @get('/solicitud-sevicios/count')
  @response(200, {
    description: 'SolicitudSevicio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudSevicio) where?: Where<SolicitudSevicio>,
  ): Promise<Count> {
    return this.solicitudSevicioRepository.count(where);
  }

  @get('/solicitud-sevicios')
  @response(200, {
    description: 'Array of SolicitudSevicio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudSevicio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudSevicio) filter?: Filter<SolicitudSevicio>,
  ): Promise<SolicitudSevicio[]> {
    return this.solicitudSevicioRepository.find(filter);
  }

  @patch('/solicitud-sevicios')
  @response(200, {
    description: 'SolicitudSevicio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudSevicio, {partial: true}),
        },
      },
    })
    solicitudSevicio: SolicitudSevicio,
    @param.where(SolicitudSevicio) where?: Where<SolicitudSevicio>,
  ): Promise<Count> {
    return this.solicitudSevicioRepository.updateAll(solicitudSevicio, where);
  }

  @get('/solicitud-sevicios/{id}')
  @response(200, {
    description: 'SolicitudSevicio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudSevicio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudSevicio, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudSevicio>
  ): Promise<SolicitudSevicio> {
    return this.solicitudSevicioRepository.findById(id, filter);
  }

  @patch('/solicitud-sevicios/{id}')
  @response(204, {
    description: 'SolicitudSevicio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudSevicio, {partial: true}),
        },
      },
    })
    solicitudSevicio: SolicitudSevicio,
  ): Promise<void> {
    await this.solicitudSevicioRepository.updateById(id, solicitudSevicio);
  }

  @put('/solicitud-sevicios/{id}')
  @response(204, {
    description: 'SolicitudSevicio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudSevicio: SolicitudSevicio,
  ): Promise<void> {
    await this.solicitudSevicioRepository.replaceById(id, solicitudSevicio);
  }

  @del('/solicitud-sevicios/{id}')
  @response(204, {
    description: 'SolicitudSevicio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudSevicioRepository.deleteById(id);
  }
}
