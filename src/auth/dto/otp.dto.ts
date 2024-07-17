import { IsEmail, IsString, Length, length } from "class-validator";



export class OtpDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    username: string;
    
    @IsString()
    @Length(6, 6)
    otp: string;
}