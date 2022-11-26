import {Entity, model, property, hasMany} from '@loopback/repository';
import {Producto} from './producto.model';
import {SolicitudSevicio} from './solicitud-sevicio.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Password: string;

  @property({
    type: 'string',
    required: true,
  })
  Rol: string;

  @property({
    type: 'boolean',
    required: true,
  })
  Promocion: boolean;

  @hasMany(() => Producto)
  productos: Producto[];

  @hasMany(() => SolicitudSevicio)
  solicitudSevicios: SolicitudSevicio[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
