import { IsArray, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOrderServiceDto {
  @IsString()
  description: string;

  @IsString()
  status: string;

  @Type(() => Number)
  @IsInt()
  carId: number;

  @Type(() => Number)
  @IsInt()
  employeeId: number;

  @IsArray()
  @Type(() => Number)
  @IsInt({ each: true })
  partIds: number[];
}