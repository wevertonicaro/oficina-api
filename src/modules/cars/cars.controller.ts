import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { FindCarParamsDto, FindCarsByClientDto } from './dto/find-car-params.dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carsService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: FindCarParamsDto) {
    return this.carsService.findOne(id);
  }

  @Get('client/:clientId')
  findByClientId(@Param() { clientId }: FindCarsByClientDto) {
    return this.carsService.findByClientId(clientId);
  }

  @Patch(':id')
  update(@Param() { id }: FindCarParamsDto, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param() { id }: FindCarParamsDto ) {
    return this.carsService.remove(id);
  }
}
