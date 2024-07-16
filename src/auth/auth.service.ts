import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRegisterDto } from './dto/auth.register.dto';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';
import { MailerService } from 'src/mailer/mailer.service';
import * as otpGen from 'otp-generator';
import { NotFoundError } from 'rxjs';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly mailerService: MailerService,
  ) { }

  async register(createAuthDto: UserRegisterDto) {
    const { email, username, password } = createAuthDto;

    const byEmail = await this.userModel.findOne({
      where: { email: email }
    });

    const byUsername = await this.userModel.findOne({
      where: { username: username }
    });

    if (byEmail || byUsername) {
      throw new BadRequestException('User already exists');
    }
    const id: string = uuid();

    const user = new this.userModel({ id, ...createAuthDto });
    user.save();

    const otp = otpGen.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false, digits: true });
    await this.mailerService.sendMail(email, 'OTP', '', `<h1> ${otp} </h1>`);

    return { message: 'User created', uuid: id, otpSend: true }
  }

  async findAll() {
    return await this.userModel.findAll();
  }

  async findOne(id: string) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found")
    }
    return user;
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {

    const { email, username, password } = updateAuthDto;

    const byEmail = await this.userModel.findOne({
      where: { email: email }
    });

    const byUsername = await this.userModel.findOne({
      where: { username: username }
    });

    if (byEmail || byUsername) {
      throw new BadRequestException('User already exists');
    }

    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const [, [updatedUser]] = await this.userModel.update({ ...updateAuthDto }, { where: { id }, returning: true });
    return updatedUser;
  }

remove(id: number) {
  return `This action removes a #${id} auth`;
}
}
