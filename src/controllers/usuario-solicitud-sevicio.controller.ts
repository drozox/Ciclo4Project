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
  Usuario,
  SolicitudSevicio,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioSolicitudSevicioController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/solicitud-sevicios', {
    responses: {
      '200': {
        description: 'Array of Usuario has many SolicitudSevicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudSevicio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudSevicio>,
  ): Promise<SolicitudSevicio[]> {
    return this.usuarioRepository.solicitudSevicios(id).find(filter);
  }

  @post('/usuarios/{id}/solicitud-sevicios', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudSevicio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudSevicio, {
            title: 'NewSolicitudSevicioInUsuario',
            exclude: ['Id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) solicitudSevicio: Omit<SolicitudSevicio, 'Id'>,
  ): Promise<SolicitudSevicio> {
    return this.usuarioRepository.solicitudSevicios(id).create(solicitudSevicio);
  }

  @patch('/usuarios/{id}/solicitud-sevicios', {
    responses: {
      '200': {
        description: 'Usuario.SolicitudSevicio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudSevicio, {partial: true}),
        },
      },
    })
    solicitudSevicio: Partial<SolicitudSevicio>,
    @param.query.object('where', getWhereSchemaFor(SolicitudSevicio)) where?: Where<SolicitudSevicio>,
  ): Promise<Count> {
    return this.usuarioRepository.solicitudSevicios(id).patch(solicitudSevicio, where);
  }

  @del('/usuarios/{id}/solicitud-sevicios', {
    responses: {
      '200': {
        description: 'Usuario.SolicitudSevicio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudSevicio)) where?: Where<SolicitudSevicio>,
  ): Promise<Count> {
    return this.usuarioRepository.solicitudSevicios(id).delete(where);
  }
}
