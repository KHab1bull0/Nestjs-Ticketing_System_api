import { IsEmail, IsEnum, IsString, Length } from 'class-validator';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ORGANIZER = 'organizer',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class CreateUserDto {

  @IsEmail()
  email: string;

  @IsString()
  @Length(3, 20)
  username: string;

  @IsString()
  @Length(8, 100)
  password: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsEnum(UserStatus)
  status: UserStatus;

  createdAt: Date;

  updatedAt: Date;
}