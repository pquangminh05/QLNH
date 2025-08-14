import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { OrderItemEntity } from './entities/order-item.entity';
import { OrderService } from './services/order.service';
import { OrderController } from './controllers/order.controller';
import { TableEntity } from '../tables/entities/table.entity';
import { MenuModule } from '../menu/menu.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, OrderItemEntity, TableEntity]),
    MenuModule,
  ],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}
