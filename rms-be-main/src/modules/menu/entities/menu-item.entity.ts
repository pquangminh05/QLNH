import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('menu_items')
export class MenuItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({ default: 'available' })
  status: 'available' | 'unavailable';

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  image_url?: string;
}
