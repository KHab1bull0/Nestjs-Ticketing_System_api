import { IsDate, IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";



export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    location: string;

    @IsDateString()
    @IsNotEmpty()
    date: Date;

    @IsString()
    @IsNotEmpty()
    time: Date;

    @IsNumber()
    @IsNotEmpty()
    totalTickets: number;
}
