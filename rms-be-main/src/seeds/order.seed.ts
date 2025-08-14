// 📄 src/seeds/order.seed.ts
import { DataSource } from 'typeorm';
import { OrderEntity } from '../modules/orders/entities/order.entity';
import { OrderItemEntity } from '../modules/orders/entities/order-item.entity';
import { TableEntity } from '../modules/tables/entities/table.entity';
import { MenuItemEntity } from '../modules/menu/entities/menu-item.entity';

export const seedOrders = async (dataSource: DataSource) => {
  const orderRepo = dataSource.getRepository(OrderEntity);
  const orderItemRepo = dataSource.getRepository(OrderItemEntity);
  const tableRepo = dataSource.getRepository(TableEntity);
  const menuRepo = dataSource.getRepository(MenuItemEntity);

  const tables = await tableRepo.find();
  const menuItems = await menuRepo.find();

  if (!tables.length || !menuItems.length)
    throw new Error('Missing seed data: tables or menuItems');

  for (let i = 0; i < 20; i++) {
    const table = tables[i % tables.length];

    const order = orderRepo.create({
      table,
      status: 'pending',
      items: [],
    });

    // Random từ 1–3 món trong danh sách menu
    const selected = menuItems
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);

    const items = selected.map((menuItem) =>
      orderItemRepo.create({
        menu_item: menuItem,
        quantity: Math.floor(Math.random() * 3) + 1,
        price: Number(menuItem.price),
      }),
    );

    order.items = items;

    await orderRepo.save(order);
  }

  console.log('✅ Seeded 20 orders with real menu items');
};
