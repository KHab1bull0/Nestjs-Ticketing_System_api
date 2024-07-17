import { Optional } from '@nestjs/common';
import { IsEmail, IsEnum, IsOptional, IsString, Length } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ORGANIZER = 'organizer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class UserRegisterDto {

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(6, 15)
  password: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;

  @IsEnum(UserStatus)
  @IsOptional()
  status: UserStatus;

  createdAt: Date;

  updatedAt: Date;
}