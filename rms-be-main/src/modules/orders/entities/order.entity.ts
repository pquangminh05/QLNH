// 📁 src/modules/orders/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

import { OrderItemEntity } from './order-item.entity';
import { TableEntity } from '../../tables/entities/table.entity';

export enum OrderStatus {
  PENDING = 'pending',
  PREPARING = 'preparing',
  DONE = 'done',
  SERVED = 'served',
  PAID = 'paid',
}

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'preparing', 'done', 'served', 'paid'],
    default: 'pending',
  })
  status: 'pending' | 'preparing' | 'done' | 'served' | 'paid';

  @ManyToOne(() => TableEntity, (table) => table.orders, { eager: true })
  @JoinColumn({ name: 'table_id' }) // ✅ CHỈ ĐỊNH RÕ TÊN CỘT
  table: TableEntity;

  @Column()
  table_id: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order, { cascade: true })
  items: OrderItemEntity[];

  @CreateDateColumn()
  created_at: Date;
}
