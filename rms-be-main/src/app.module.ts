import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from './modules/reservations/reservations.module';
import { TablesModule } from './modules/tables/tables.module';
import { OrderModule } from './modules/orders/orders.module';
import { MenuModule } from './modules/menu/menu.module';
import { PaymentModule } from './modules/payments/payments.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: false,
    }),
    AuthModule,
    ReservationModule,
    TablesModule,
    OrderModule,
    MenuModule,
    PaymentModule,
    EmployeesModule,
  ],
})
export class AppModule {}
