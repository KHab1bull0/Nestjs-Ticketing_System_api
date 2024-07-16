import { IsString, IsInt } from 'class-validator';


export class CreateAuthDto {
    @IsString()
    email: string;
    @IsString()
    username: string;
    @IsString()
    password: string;
    @IsString()
    confirmPassword: string;
    @IsString()
    role: string; // Enum: ["user", "admin", "organizer"]
    @IsString()
    firstName: string;
    @IsString()
    lastName: string;
}
