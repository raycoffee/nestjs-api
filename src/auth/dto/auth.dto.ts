import { IsEmail, IsNotEmpty, IsString, Min, MinLength } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    password: string;
}