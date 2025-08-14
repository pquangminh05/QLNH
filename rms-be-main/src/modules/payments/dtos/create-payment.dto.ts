import { IsUUID, IsEnum } from 'class-validator';

export class CreatePaymentDto {
  @IsUUID()
  order_id: string;

  @IsEnum(['cash', 'card', 'e-wallet'])
  method: 'cash' | 'card' | 'e-wallet';
}
