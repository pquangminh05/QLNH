import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TableEntity } from '../../tables/entities/table.entity';

@Entity('reservations')
export class ReservationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  customer_name: string;

  @Column()
  phone: string;

  @Column({ type: 'timestamp' })
  reservation_time: Date;

  @Column({ nullable: true })
  note?: string;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'cancelled';

  @ManyToOne(() => TableEntity, (table) => table.reservations, {
    onDelete: 'SET NULL',
    eager: true,
  })
  @JoinColumn({ name: 'table_id' })
  table: TableEntity;
}
