import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemEntity } from './entities/menu-item.entity';
import { MenuService } from './services/menu.service';
import { MenuController } from './controllers/menu.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemEntity])],
  providers: [MenuService],
  controllers: [MenuController],
  exports: [TypeOrmModule],
})
export class MenuModule {}
