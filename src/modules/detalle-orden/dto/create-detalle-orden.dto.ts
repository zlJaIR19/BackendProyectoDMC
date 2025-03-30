export interface CreateDetalleOrdenDto {
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  ordenId: number;
  productoId: number;
}
