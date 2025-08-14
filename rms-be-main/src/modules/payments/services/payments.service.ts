import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaymentEntity } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { OrderEntity } from '../../orders/entities/order.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private repo: Repository<PaymentEntity>,
    @InjectRepository(OrderEntity)
    private orderRepo: Repository<OrderEntity>,
  ) {}

  async create(dto: CreatePaymentDto) {
    const order = await this.orderRepo.findOne({
      where: { id: dto.order_id },
      relations: ['items'],
    });

    if (!order) throw new NotFoundException('Order not found');

    if (!['done', 'served'].includes(order.status)) {
      throw new BadRequestException('Order chưa sẵn sàng để thanh toán');
    }

    const total =
      order.items?.reduce((sum, i) => sum + i.quantity * i.price, 0) ?? 0;

    const payment = this.repo.create({
      order_id: dto.order_id,
      method: dto.method,
      amount: total,
    });

    await this.repo.save(payment);
    await this.orderRepo.update(dto.order_id, { status: 'paid' });

    return payment;
  }

  async findAll() {
    return this.repo.find({ order: { paid_at: 'DESC' } });
  }
}
