import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity, OrderStatus } from '../entities/order.entity';
import { OrderItemEntity } from '../entities/order-item.entity';
import { TableEntity } from '../../tables/entities/table.entity';
import { MenuItemEntity } from '../../menu/entities/menu-item.entity';
import { CreateOrderDto } from '../dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
    @InjectRepository(OrderItemEntity)
    private readonly itemRepo: Repository<OrderItemEntity>,
    @InjectRepository(TableEntity)
    private readonly tableRepo: Repository<TableEntity>,
    @InjectRepository(MenuItemEntity)
    private readonly menuRepo: Repository<MenuItemEntity>,
  ) {}

  async create(dto: CreateOrderDto) {
    const table = await this.tableRepo.findOneBy({ id: dto.table_id });
    if (!table) throw new Error('Bàn không tồn tại');

    const order = this.orderRepo.create({
      table_id: dto.table_id,
      status: 'pending',
    });
    await this.orderRepo.save(order);

    for (const item of dto.items) {
      const menuItem = await this.menuRepo.findOneBy({ id: item.menu_item_id });
      if (!menuItem)
        throw new Error(`Món ăn ${item.menu_item_id} không tồn tại`);

      await this.itemRepo.save({
        order,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: Number(menuItem.price),
      });
    }

    return this.orderRepo.findOne({
      where: { id: order.id },
      relations: ['items', 'items.menu_item', 'table'],
    });
  }

  async findAll() {
    return this.orderRepo.find({
      relations: ['items', 'items.menu_item', 'table'],
      order: { created_at: 'DESC' },
    });
  }

  async updateStatus(id: string, status: string) {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new Error('Không tìm thấy đơn hàng');

    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new Error('Trạng thái không hợp lệ');
    }

    order.status = status as OrderStatus;
    return this.orderRepo.save(order);
  }
}
