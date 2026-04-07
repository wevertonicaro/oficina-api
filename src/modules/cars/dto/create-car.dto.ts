import { IsInt, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @IsString()
  plate: string;

  @IsString()
  model: string;

  @IsString()
  brand: string;

  @Type(() => Number)
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  year: number;

  @Type(() => Number)
  @IsInt()
  clientId: number;
}