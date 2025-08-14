import { DataSource } from 'typeorm';
import { TableEntity } from '../modules/tables/entities/table.entity';

export const seedTables = async (dataSource: DataSource) => {
  const tableRepo = dataSource.getRepository(TableEntity);

  const tables: Array<Partial<TableEntity>> = [
    { name: 'Bàn 1', status: 'available' },
    { name: 'Bàn 2', status: 'available' },
    { name: 'Bàn 3', status: 'available' },
    { name: 'Bàn VIP', status: 'available' },
    { name: 'Bàn Ngoài Trời', status: 'available' },
  ];

  for (const table of tables) {
    const exists = await tableRepo.findOne({ where: { name: table.name } });
    if (!exists) {
      await tableRepo.save(tableRepo.create(table));
    }
  }

  console.log('✅ Tables seeded!');
};
