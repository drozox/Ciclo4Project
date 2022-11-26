import {Entity, model, property} from '@loopback/repository';

@model()
export class Prospecto extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  Id?: string;

  @property({
    type: 'string',
    required: true,
  })
  Email: string;

  @property({
    type: 'string',
    required: true,
  })
  Celular: string;


  constructor(data?: Partial<Prospecto>) {
    super(data);
  }
}

export interface ProspectoRelations {
  // describe navigational properties here
}

export type ProspectoWithRelations = Prospecto & ProspectoRelations;
