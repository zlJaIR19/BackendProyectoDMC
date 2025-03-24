import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Usuario } from './usuario.entity';
import { DetalleOrden } from './detalle-orden.entity';

@Entity('ordenes')
export class Orden {
  @PrimaryGeneratedColumn({ name: 'id_ordenes' })
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  total: number;

  @Column({ length: 20 })
  estado: string;

  @Column({ type: 'timestamp' })
  fecha_pedido: Date;

  @Column({ name: 'id_usuarios' })
  usuarioId: number;

  @ManyToOne(() => Usuario, usuario => usuario.ordenes)
  @JoinColumn({ name: 'id_usuarios' })
  usuario: Usuario;

  @OneToMany(() => DetalleOrden, detalleOrden => detalleOrden.orden)
  detallesOrden: DetalleOrden[];
}
