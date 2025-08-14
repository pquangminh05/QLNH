import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { TableEntity } from '../tables/entities/table.entity';
import { ReservationService } from './services/reservation.service';
import { ReservationController } from './controllers/reservation.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity, TableEntity])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
