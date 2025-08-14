// 📄 src/seeds/menu.seed.ts
import { DataSource } from 'typeorm';
import { MenuItemEntity } from '../modules/menu/entities/menu-item.entity';

export const seedMenu = async (dataSource: DataSource) => {
  const menuRepo = dataSource.getRepository(MenuItemEntity);

  const items: Partial<MenuItemEntity>[] = [
    {
      name: 'Phở Bò',
      price: 45000,
      image_url: 'https://example.com/images/pho-bo.jpg',
    },
    {
      name: 'Bún Chả',
      price: 40000,
      image_url: 'https://example.com/images/bun-cha.jpg',
    },
    {
      name: 'Bánh Mì Thịt',
      price: 20000,
      image_url: 'https://example.com/images/banh-mi.jpg',
    },
    {
      name: 'Gỏi Cuốn',
      price: 30000,
      image_url: 'https://example.com/images/goi-cuon.jpg',
    },
    {
      name: 'Cơm Tấm',
      price: 50000,
      image_url: 'https://example.com/images/com-tam.jpg',
    },
    {
      name: 'Bún Bò Huế',
      price: 50000,
      image_url: 'https://example.com/images/bun-bo-hue.jpg',
    },
    {
      name: 'Bánh Xèo',
      price: 35000,
      image_url: 'https://example.com/images/banh-xeo.jpg',
    },
    {
      name: 'Hủ Tiếu',
      price: 40000,
      image_url: 'https://example.com/images/hu-tieu.jpg',
    },
    {
      name: 'Chả Giò',
      price: 25000,
      image_url: 'https://example.com/images/cha-gio.jpg',
    },
    {
      name: 'Xôi Mặn',
      price: 30000,
      image_url: 'https://example.com/images/xoi-man.jpg',
    },
  ];

  for (const item of items) {
    const exist = await menuRepo.findOneBy({ name: item.name });
    if (!exist) {
      await menuRepo.save(menuRepo.create(item));
    }
  }

  console.log('✅ Seeded menu items with Vietnamese dishes');
};
