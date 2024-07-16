import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from './dto/auth.register.dto';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) { }

  async register(createAuthDto: CreateUserDto) {
    const { email, username, password } = createAuthDto;

    const existingUser = await this.userModel.findOne({
      where: { email: email }
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }


    const id: string = uuid();

    const user = new this.userModel({ id, ...createAuthDto });
    user.save();

    return { message: 'User created', uuid: id, otpSend: true }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
