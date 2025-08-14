import { Controller, Get, Post, Body } from '@nestjs/common';

import { PaymentService } from '../services/payments.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';

@Controller('payments')
export class PaymentController {
  constructor(private readonly service: PaymentService) {}

  @Post()
  create(@Body() dto: CreatePaymentDto) {
    console.log('BODY RECEIVED', dto);
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }
}
