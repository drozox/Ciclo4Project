import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudSevicio,
  Usuario,
} from '../models';
import {SolicitudSevicioRepository} from '../repositories';

export class SolicitudSevicioUsuarioController {
  constructor(
    @repository(SolicitudSevicioRepository)
    public solicitudSevicioRepository: SolicitudSevicioRepository,
  ) { }

  @get('/solicitud-sevicios/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to SolicitudSevicio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof SolicitudSevicio.prototype.Id,
  ): Promise<Usuario> {
    return this.solicitudSevicioRepository.usuario(id);
  }
}
