import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { MenuItemEntity } from '../../menu/entities/menu-item.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  // Quan hệ với Order
  @ManyToOne(() => OrderEntity, (order) => order.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: OrderEntity;

  @Column()
  order_id: string;

  // Quan hệ với MenuItem
  @ManyToOne(() => MenuItemEntity, { eager: true })
  @JoinColumn({ name: 'menu_item_id' })
  menu_item: MenuItemEntity;

  @Column()
  menu_item_id: string;
}
