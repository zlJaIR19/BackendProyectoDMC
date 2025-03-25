import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { ProductosModule } from './modules/productos/productos.module';
import { OrdenesModule } from './modules/ordenes/ordenes.module';
import { DetalleOrdenModule } from './modules/detalle-orden/detalle-orden.module';
import { Usuario } from './entities/usuario.entity';
import { Categoria } from './entities/categoria.entity';
import { Producto } from './entities/producto.entity';
import { Orden } from './entities/orden.entity';
import { DetalleOrden } from './entities/detalle-orden.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1919',
      database: 'tienda',
      entities: [Usuario, Categoria, Producto, Orden, DetalleOrden],
      synchronize: false,
    }),
    UsuariosModule,
    CategoriasModule,
    ProductosModule,
    OrdenesModule,
    DetalleOrdenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
