import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? {
            url: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
          }
        : {
            host: process.env.DATABASE_HOST || 'localhost',
            port: parseInt(process.env.DATABASE_PORT || '5432'),
            username: process.env.DATABASE_USERNAME || 'postgres',
            password: process.env.DATABASE_PASSWORD || '1919',
            database: process.env.DATABASE_NAME || 'tienda',
          }),
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
