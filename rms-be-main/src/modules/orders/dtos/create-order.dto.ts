import { IsArray, IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class OrderItemInputDto {
  @IsUUID()
  menu_item_id: string;

  @IsNotEmpty()
  quantity: number;
}

export class CreateOrderDto {
  @IsUUID()
  table_id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];
}
