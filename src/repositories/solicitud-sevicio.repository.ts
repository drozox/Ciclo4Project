import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SolicitudSevicio, SolicitudSevicioRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class SolicitudSevicioRepository extends DefaultCrudRepository<
  SolicitudSevicio,
  typeof SolicitudSevicio.prototype.Id,
  SolicitudSevicioRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof SolicitudSevicio.prototype.Id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(SolicitudSevicio, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
