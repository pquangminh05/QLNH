import {
  Controller,
  Post,
  Get,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ReservationService } from '../services/reservation.service';
import { CreateReservationDto } from '../dtos/create-reservation.dto';
import { UpdateReservationDto } from '../dtos/update-reservation.dto';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly service: ReservationService) {}

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.service.create(dto);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin', 'staff')
  @Get()
  getAll() {
    return this.service.findAll();
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin', 'staff')
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateReservationDto) {
    return this.service.updateStatus(id, dto.status);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles('admin', 'staff')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
