import { Injectable } from '@nestjs/common';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Part } from './entities/part.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PartsService {
  constructor(
    @InjectRepository(Part)
    private partsRepository: Repository<Part>,
  ) {}

  create(createPartDto: CreatePartDto) {
    return this.partsRepository.save(createPartDto);
  }

  findAll() {
    return this.partsRepository.find();
  }

  findOne(id: number) {
    return this.partsRepository.findOne({ where: { id } });
  }

  findByCode(code: string) {
    return this.partsRepository.findOne({ where: { code } });
  }

  findByCarId(car: number) {
    return this.partsRepository.find({ where: { car: { id: car } } });
  }

  update(id: number, updatePartDto: UpdatePartDto) {
    return this.partsRepository.update(id, updatePartDto);
  }

  remove(id: number) {
    return this.partsRepository.delete(id);
  }
}
