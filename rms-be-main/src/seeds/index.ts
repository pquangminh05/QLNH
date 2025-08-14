import { DataSource } from 'typeorm';
import { TableEntity } from '../modules/tables/entities/table.entity';
import { seedTables } from './table.seed';
import * as dotenv from 'dotenv';
import { seedOrders } from './order.seed';
import { OrderEntity } from '../modules/orders/entities/order.entity';
import { OrderItemEntity } from '../modules/orders/entities/order-item.entity';
import { seedMenu } from './menu.seed';
import { MenuItemEntity } from '../modules/menu/entities/menu-item.entity';
import { seedOrderItems } from './order-item.seed';
import { seedUsers } from './user.seed';
import { UserEntity } from '../modules/employees/entities/user.entity';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  entities: [
    TableEntity,
    OrderEntity,
    OrderItemEntity,
    MenuItemEntity,
    UserEntity,
  ],
  synchronize: false,
});

AppDataSource.initialize()
  .then(async () => {
    console.log('🚀 Connected to DB');
    await seedTables(AppDataSource);
    await seedOrders(AppDataSource);
    await seedMenu(AppDataSource);
    await seedOrderItems(AppDataSource);
    await seedUsers(AppDataSource);
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error seeding data:', err);
    process.exit(1);
  });
