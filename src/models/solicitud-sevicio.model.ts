import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class SolicitudSevicio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
  })
  Descripcion?: string;

  @property({
    type: 'string',
    required: true,
  })
  Estado: string;

  @property({
    type: 'date',
    required: true,
  })
  Fecha: string;

  @property({
    type: 'string',
  })
  Comentarios?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<SolicitudSevicio>) {
    super(data);
  }
}

export interface SolicitudSevicioRelations {
  // describe navigational properties here
}

export type SolicitudSevicioWithRelations = SolicitudSevicio & SolicitudSevicioRelations;
