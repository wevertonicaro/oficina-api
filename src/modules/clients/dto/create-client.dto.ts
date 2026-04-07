import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateClientDto {
    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    address: string;

    @IsStrongPassword()
    password: string;
}
