import { IsEnum, IsNumber, IsString, IsUUID, isEnum } from "class-validator";



enum Type {
    standard = 'standard',
    vip = 'vip',
    student = 'student',
    senior = 'senior'
}

enum Currency {
    usd = 'USD',
    eur = 'EUR',
    uzs = 'UZS'
}

enum Status {
    available = 'available',
    booked = 'booked',
    sold = 'sold'
}

export class CreateTicketDto {
    
    @IsUUID()
    @IsString()
    eventId: string;
    
    @IsString()
    @IsEnum(Type)
    type: string;

    @IsNumber()
    price: number;

    @IsString()
    @IsEnum(Currency)
    currency: string;

    @IsNumber()
    seatNumber: number;

    @IsString()
    @IsEnum(Status)
    status: string
}


