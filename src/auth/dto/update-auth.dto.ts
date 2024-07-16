import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthDto } from './user.register.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
