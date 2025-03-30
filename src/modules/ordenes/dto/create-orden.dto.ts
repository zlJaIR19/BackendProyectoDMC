import { DetalleOrdenDto } from './detalle-orden.dto';

export interface CreateOrdenDto {
  fecha_pedido: Date;
  total: number;
  usuarioId: number;
  estado: string;
  detallesOrden?: DetalleOrdenDto[];
}
