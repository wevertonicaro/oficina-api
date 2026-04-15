import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderServiceDto } from './dto/create-order-service.dto';
import { UpdateOrderServiceDto } from './dto/update-order-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderService } from './entities/order-service.entity';
import { In, Repository } from 'typeorm';
import { Car } from '../cars/entities/car.entity';
import { Employee } from '../employees/entities/employee.entity';
import { Part } from '../parts/entities/part.entity';

@Injectable()
export class OrderServiceService {
  constructor(
    @InjectRepository(OrderService)
    private orderServiceRepository: Repository<OrderService>,

    @InjectRepository(Car)
    private carRepository: Repository<Car>,

    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,

    @InjectRepository(Part)
    private partRepository: Repository<Part>,

    
  ) {}
  
  private calculateTotal(parts: Part[]): number {
    return parts.reduce((sum, part) => {
      return sum + Number(part.price);
    }, 0);
  }

  async create(createOrderServiceDto: CreateOrderServiceDto) {
    const { carId, employeeId, partIds, description } =
      createOrderServiceDto;

    const car = await this.carRepository.findOneBy({ id: carId });
    if (!car) throw new NotFoundException('Carro não encontrado');

    const employee = await this.employeeRepository.findOneBy({
      id: employeeId,
    });
    if (!employee)
      throw new NotFoundException('Funcionário não encontrado');

    const parts = await this.partRepository.findBy({
      id: In(partIds),
    });

    if (!parts.length)
      throw new NotFoundException('Peças não encontradas');

    if (parts.length !== partIds.length)
      throw new NotFoundException(
        'Algumas peças não foram encontradas',
      );

    const total = this.calculateTotal(parts);

    const orderService = this.orderServiceRepository.create({
      description,
      car,
      employee,
      parts,
      total,
    });

    return this.orderServiceRepository.save(orderService);
  }

  findAll() {
    return this.orderServiceRepository.find({
      relations: ['car', 'employee', 'parts'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderServiceRepository.findOne({
      where: { id },
      relations: ['car', 'employee', 'parts'],
    });

    if (!order)
      throw new NotFoundException('Ordem de serviço não encontrada');

    return order;
  }

  async update(id: number, updateDto: UpdateOrderServiceDto) {
    const order = await this.findOne(id);

    if (updateDto.description) {
      order.description = updateDto.description;
    }

    if (updateDto.carId) {
      const car = await this.carRepository.findOneBy({
        id: updateDto.carId,
      });

      if (!car) throw new NotFoundException('Carro não encontrado');

      order.car = car;
    }

    if (updateDto.employeeId) {
      const employee = await this.employeeRepository.findOneBy({
        id: updateDto.employeeId,
      });

      if (!employee)
        throw new NotFoundException('Funcionário não encontrado');

      order.employee = employee;
    }

    if (updateDto.partIds) {
      const parts = await this.partRepository.findBy({
        id: In(updateDto.partIds),
      });

      if (!parts.length)
        throw new NotFoundException('Peças não encontradas');

      if (parts.length !== updateDto.partIds.length)
        throw new NotFoundException(
          'Algumas peças não foram encontradas',
        );

      order.parts = parts;
    }

    return this.orderServiceRepository.save(order);
  }

  async remove(id: number) {
    const order = await this.findOne(id);
    return this.orderServiceRepository.remove(order);
  }
}