import { CreateProductoDto } from './create-producto.dto';

export interface UpdateProductoDto extends Partial<CreateProductoDto> {}
