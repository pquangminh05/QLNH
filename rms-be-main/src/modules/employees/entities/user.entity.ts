import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // ✅ đã được mã hoá (bcrypt)

  @Column({
    type: 'enum',
    enum: ['admin', 'manager', 'staff', 'chef'],
    default: 'staff',
  })
  role: 'admin' | 'manager' | 'staff' | 'chef';
}
