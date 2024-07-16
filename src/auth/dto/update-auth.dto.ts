import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from './auth.register.dto';

export class UpdateAuthDto extends PartialType(UserRegisterDto) { }
