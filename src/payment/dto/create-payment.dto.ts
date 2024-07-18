import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

enum Status {
    pending = 'pending',
    completed = 'completed',
    failed = 'failed'
}

enum Method {
    credit_card = 'credit_card',
    bank_transfer = 'bank_transfer',
    paypal = 'paypal'
}


export class CreatePaymentDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    orderId: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Method)
    method: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Status)
    status: string;

    @IsString()
    @IsNotEmpty()
    transactionId: string;
}
