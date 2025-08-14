// src/modules/employees/entities/employee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkLogEntity } from './work-log.entity';

@Entity('employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: 'manager' | 'waiter' | 'chef';

  @Column('decimal', { default: 0 })
  base_salary: number;

  @OneToMany(() => WorkLogEntity, (log) => log.employee)
  logs: WorkLogEntity[];
}
