import { IsNotEmpty, IsString } from "class-validator";


export class Token {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    rToken: string;
}