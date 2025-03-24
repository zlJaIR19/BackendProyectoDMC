import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Orden } from './orden.entity';
import { Producto } from './producto.entity';

@Entity('detalle_orden')
export class DetalleOrden {
  @PrimaryGeneratedColumn({ name: 'id_detalle_orden' })
  id: number;

  @Column()
  cantidad: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  precio_unitario: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  subtotal: number;

  @Column({ name: 'id_ordenes' })
  ordenId: number;

  @Column({ name: 'id_productos' })
  productoId: number;

  @ManyToOne(() => Orden, orden => orden.detallesOrden)
  @JoinColumn({ name: 'id_ordenes' })
  orden: Orden;

  @ManyToOne(() => Producto, producto => producto.detallesOrden)
  @JoinColumn({ name: 'id_productos' })
  producto: Producto;
}
