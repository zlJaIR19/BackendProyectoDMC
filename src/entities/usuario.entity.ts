import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Orden } from './orden.entity';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn({ name: 'id_usuarios' })
  id: number;

  @Column({ length: 15 })
  usuario: string;

  @Column({ length: 20 })
  nombre: string;

  @Column({ length: 80 })
  correo: string;

  @Column({ length: 10 })
  contraseña: string;

  @Column({ length: 8 })
  rol: string;

  @Column({ type: 'date' })
  fecha_nacimiento: Date;

  @Column({ type: 'date' })
  fecha_creacion: Date;

  @OneToMany(() => Orden, orden => orden.usuario)
  ordenes: Orden[];
}
