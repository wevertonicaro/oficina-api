import { Module } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { OrderServiceController } from './order-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './entities/order-service.entity';
import { Car } from '../cars/entities/car.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Part } from '../parts/entities/part.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    OrderService,
    Car,
    Employee,
    Part
  ])],
  controllers: [OrderServiceController],
  providers: [OrderServiceService],
})
export class OrderServiceModule {}
