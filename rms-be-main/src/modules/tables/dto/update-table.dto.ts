import { IsOptional, IsEnum } from 'class-validator';
// import { TableStatus } from '../entities/table.entity';
export type TableStatus = 'available' | 'reserved' | 'occupied';

export class UpdateTableDto {
  @IsOptional()
  @IsEnum(['available', 'reserved', 'occupied'])
  status?: TableStatus;

  // Thêm các field khác nếu có (name, description...)
}
