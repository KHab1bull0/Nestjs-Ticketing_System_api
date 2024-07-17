

import { IsEmail, IsString, Length, length } from "class-validator";



export class LoginDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @Length(6, 15)
    password: string;
    
}