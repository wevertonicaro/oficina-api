import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carRepository: Repository<Car>,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carRepository.save(createCarDto);
  }

  findAll() {
    return this.carRepository.find();
  }

  findOne(id: number) {
    return this.carRepository.findOneBy({ id });
  }

  findByClientId(clientId: number) {
    return this.carRepository.findBy({ clientId });
  }

  update(id: number, updateCarDto: UpdateCarDto) {
    return this.carRepository.update(id, updateCarDto);
  }

  remove(id: number) {
    return this.carRepository.delete(id);
  }
}
