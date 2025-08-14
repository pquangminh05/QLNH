// src/modules/employees/entities/work-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EmployeeEntity } from './employee.entity';

@Entity('work_logs')
export class WorkLogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  check_in: Date;

  @Column({ nullable: true })
  check_out: Date;

  @ManyToOne(() => EmployeeEntity, (emp) => emp.logs)
  employee: EmployeeEntity;
}
