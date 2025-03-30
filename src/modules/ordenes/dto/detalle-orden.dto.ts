export interface DetalleOrdenDto {
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
  ordenId?: number;
  productoId: number;
}
