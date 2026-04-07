import { IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePartDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  code: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;
}