import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ReservationEntity } from '../entities/reservation.entity';
import { TableEntity } from '../../tables/entities/table.entity';
import { CreateReservationDto } from '../dtos/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
  ) {}

  private durationMin = 90;

  async create(dto: CreateReservationDto) {
    const table = await this.tableRepo.findOneBy({ id: dto.table_id });
    if (!table) throw new NotFoundException('Table not found');
    if (table.status !== 'available')
      throw new BadRequestException('Table is not available');

    const start = new Date(dto.reservation_time);
    const end = new Date(start.getTime() + this.durationMin * 60000);

    const overlap = await this.reservationRepo
      .createQueryBuilder('r')
      .leftJoin('r.table', 't')
      .where('r.table = :tableId', { tableId: dto.table_id })
      .andWhere('r.reservation_time BETWEEN :checkStart AND :checkEnd', {
        checkStart: new Date(start.getTime() - this.durationMin * 60000),
        checkEnd: end,
      })
      .getOne();

    if (overlap)
      throw new ConflictException('Table already reserved in this time slot');

    table.status = 'reserved';
    await this.tableRepo.save(table);

    const reservation = this.reservationRepo.create({
      ...dto,
      reservation_time: start,
      status: 'pending',
      table,
    });

    return this.reservationRepo.save(reservation);
  }

  async findAll() {
    return this.reservationRepo.find({ order: { reservation_time: 'ASC' } });
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'confirmed' | 'cancelled',
  ) {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['table'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.status = status;

    if (status === 'cancelled') {
      reservation.table.status = 'available';
      await this.tableRepo.save(reservation.table);
    }

    return this.reservationRepo.save(reservation);
  }

  async remove(id: string) {
    const reservation = await this.reservationRepo.findOne({
      where: { id },
      relations: ['table'],
    });
    if (!reservation) throw new NotFoundException('Reservation not found');

    reservation.table.status = 'available';
    await this.tableRepo.save(reservation.table);

    return this.reservationRepo.remove(reservation);
  }

  // CRON JOB — chuyển reserved → occupied
  async updateOccupied() {
    const now = new Date();

    const dueReservations = await this.reservationRepo.find({
      where: {
        reservation_time: LessThanOrEqual(now),
        status: 'confirmed',
      },
      relations: ['table'],
    });

    for (const r of dueReservations) {
      if (r.table.status === 'reserved') {
        r.table.status = 'occupied';
        await this.tableRepo.save(r.table);
      }
    }
  }
}
