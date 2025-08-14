// 📁 src/seeds/order-item.seed.ts
import { MenuItemEntity } from '../modules/menu/entities/menu-item.entity';
import { OrderItemEntity } from '../modules/orders/entities/order-item.entity';
import { OrderEntity } from '../modules/orders/entities/order.entity';
import { DataSource } from 'typeorm';

export const seedOrderItems = async (dataSource: DataSource) => {
  const orderRepo = dataSource.getRepository(OrderEntity);
  const itemRepo = dataSource.getRepository(OrderItemEntity);
  const menuRepo = dataSource.getRepository(MenuItemEntity);

  const orders = await orderRepo.find();
  const menuItems = await menuRepo.find();

  if (!orders.length || !menuItems.length) {
    console.log('⚠️ Không có order hoặc menu để seed order-item.');
    return;
  }

  const seedData: OrderItemEntity[] = [];

  for (const order of orders) {
    const randomMenu = menuItems.sort(() => 0.5 - Math.random()).slice(0, 2);
    for (const menu of randomMenu) {
      seedData.push(
        itemRepo.create({
          order: order,
          menu_item: menu,
          quantity: Math.floor(Math.random() * 3) + 1,
          price: Number(menu.price),
        }),
      );
    }
  }

  await itemRepo.save(seedData);
  console.log(`✅ Seeded ${seedData.length} order items!`);
};
