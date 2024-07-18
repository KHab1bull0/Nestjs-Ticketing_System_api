import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

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

export class UpdatePaymentDto {
    @IsString()
    @IsUUID()
    @IsOptional()
    orderId: string;

    @IsNumber()
    @IsOptional()
    amount: number;

    @IsString()
    @IsEnum(Method)
    @IsOptional()
    method: string;

    @IsString()
    @IsEnum(Status)
    status: string;

    @IsString()
    @IsOptional()
    transactionId: string;
}
