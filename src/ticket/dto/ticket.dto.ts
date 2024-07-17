import { IsEnum, IsString, IsUUID } from "class-validator";



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
    type: string;
    price: number;

    @IsString()
    @IsEnum(Currency)
    currency: string;

    @IsString()
    seatNumber: string;

    @IsString()
    @IsEnum(Status)
    status: string
}
