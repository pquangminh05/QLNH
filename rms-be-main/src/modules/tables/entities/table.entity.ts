import { ReservationEntity } from 'src/modules/reservations/entities/reservation.entity';
import { OrderEntity } from '../../orders/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('tables')
export class TableEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 'available' })
  status: 'available' | 'reserved' | 'occupied';

  @OneToMany(() => OrderEntity, (order) => order.table)
  orders: OrderEntity[];

  @OneToMany(() => ReservationEntity, (res) => res.table)
  reservations: ReservationEntity[];
}
