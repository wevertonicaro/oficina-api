import { IsInt } from "class-validator";
import { Type } from "class-transformer";

export class FindCarParamsDto {
    @Type(() => Number)
    @IsInt()
    id: number;
}

export class FindCarsByClientDto {
  @Type(() => Number)
  @IsInt()
  clientId: number;
}