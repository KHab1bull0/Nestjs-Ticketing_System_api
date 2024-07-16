import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './auth.register.dto';

export class UpdateAuthDto extends PartialType(CreateUserDto) { }
