import { IsIn, IsOptional } from 'class-validator';

export class UpdateReservationDto {
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled'])
  status?: 'pending' | 'confirmed' | 'cancelled';
}
