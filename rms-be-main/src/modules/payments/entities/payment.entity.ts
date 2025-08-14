import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @Column({ type: 'enum', enum: ['cash', 'card', 'e-wallet'] })
  method: 'cash' | 'card' | 'e-wallet';

  @Column('decimal')
  amount: number;

  @CreateDateColumn()
  paid_at: Date;
}
