import { IsString, IsPhoneNumber, IsDateString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  customer_name: string;

  @IsPhoneNumber('VN')
  phone: string;

  @IsDateString()
  reservation_time: string;

  @IsString()
  table_id: string;

  @IsString()
  note?: string;
}
