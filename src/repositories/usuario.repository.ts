import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Producto, SolicitudSevicio} from '../models';
import {ProductoRepository} from './producto.repository';
import {SolicitudSevicioRepository} from './solicitud-sevicio.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly productos: HasManyRepositoryFactory<Producto, typeof Usuario.prototype.id>;

  public readonly solicitudSevicios: HasManyRepositoryFactory<SolicitudSevicio, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ProductoRepository') protected productoRepositoryGetter: Getter<ProductoRepository>, @repository.getter('SolicitudSevicioRepository') protected solicitudSevicioRepositoryGetter: Getter<SolicitudSevicioRepository>,
  ) {
    super(Usuario, dataSource);
    this.solicitudSevicios = this.createHasManyRepositoryFactoryFor('solicitudSevicios', solicitudSevicioRepositoryGetter,);
    this.registerInclusionResolver('solicitudSevicios', this.solicitudSevicios.inclusionResolver);
    this.productos = this.createHasManyRepositoryFactoryFor('productos', productoRepositoryGetter,);
    this.registerInclusionResolver('productos', this.productos.inclusionResolver);
  }
}
