import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../modules/employees/entities/user.entity';

export const seedUsers = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(UserEntity);

  const users: Partial<UserEntity>[] = [
    {
      name: 'Admin One',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 10),
      role: 'admin',
    },
    {
      name: 'Manager One',
      email: 'manager@example.com',
      password: await bcrypt.hash('manager123', 10),
      role: 'manager',
    },
    {
      name: 'Staff A',
      email: 'staff@example.com',
      password: await bcrypt.hash('staff123', 10),
      role: 'staff',
    },
    {
      name: 'Chef A',
      email: 'chef@example.com',
      password: await bcrypt.hash('chef123', 10),
      role: 'chef',
    },
  ];

  await repo.save(repo.create(users));
  console.log('✅ Seeded users');
};
