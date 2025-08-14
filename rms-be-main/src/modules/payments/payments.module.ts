import { Module } from '@nestjs/common';
import { PaymentService } from './services/payments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../orders/entities/order.entity';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentController } from './controllers/payments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity, OrderEntity])],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
