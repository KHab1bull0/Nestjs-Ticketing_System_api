import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRegisterDto } from './dto/auth.register.dto';
import { User } from './entities/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';
import * as otpGen from 'otp-generator';
import { MailerService } from '../mailer/mailer.service';
import { Otp } from './entities/otp.entity';
import { OtpDto } from './dto/otp.dto';
import { LoginDto } from './dto/Login.dto';
import { JwtService } from '@nestjs/jwt';
import { Token } from './entities/token.entity';
import { Request } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeORm } from './entities/userTypeOrm..entity';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Otp)
    private readonly otpModel: typeof Otp,
    @InjectModel(User)
    private readonly userModel: typeof User,
    @InjectModel(Token)
    private readonly tokenModel: typeof Token,

    @InjectRepository(UserTypeORm)
    private readonly usertypeorm: Repository<UserTypeORm>,

    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) { }

  async register(createAuthDto: UserRegisterDto) {
    const { email, username, password } = createAuthDto;



    // TypeOrm section 
    const typeOrmId = uuid();
    const typeOrmUser = this.usertypeorm.save({ id: typeOrmId, ...createAuthDto })
    return typeOrmUser;
    // TypeOrm section 


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

    const newOtp = new this.otpModel({ email: email, username: username, otp: otp })
    newOtp.save()

    return { message: 'User created', uuid: id, otpSend: true }
  }

  async verifyOtp(otpDto: OtpDto) {
    const { email, username, otp } = otpDto;
    const info = await this.otpModel.findOne({ where: { email: email } });

    if (!info) {
      throw new BadRequestException('Otp not found')
    }

    const deletedOtp = await this.otpModel.destroy({ where: { email: email } });
    await this.userModel.update({ status: 'active' }, { where: { email: email } });

    if (deletedOtp) {
      return {
        message: "OTP verified, account activated"
      }
    }
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto
    const user = await this.userModel.findOne({ where: { email: email } });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const accessToken = this.jwtService.sign({ email, role: user.role }, { secret: process.env.ACCESSKEY, expiresIn: '15m' });
    const refreshToken = this.jwtService.sign({ email, role: user.role }, { secret: process.env.REFRESHKEY, expiresIn: '7d' });
    const info = await this.userModel.update({ status: "active" }, { where: { email: email }, returning: true });

    const refresh = new this.tokenModel({ email: email, rToken: refreshToken });
    refresh.save()

    return { accessToken, refreshToken }
  }

  async refreshToken(token: string) {
    const user = this.jwtService.verify(token, { secret: process.env.REFRESHKEY })
    const newAccess = this.jwtService.sign({ email: user.email, role: user.role }, { secret: process.env.ACCESSKEY, expiresIn: '15m' })
    const newRefresh = this.jwtService.sign({ email: user.email, role: user.role }, { secret: process.env.REFRESHKEY, expiresIn: '7d' });

    const obj = {
      email: user.email,
      rToken: newRefresh
    }
    const [, [updatedUser]] = await this.tokenModel.update({ ...obj }, { where: { email: user.email }, returning: true });

    return { newAccess, newRefresh }
  }


  async getMe(user: any) {
    const { email } = user

    const userInfo = await this.userModel.findOne({ where: { email: email } })

    if (!userInfo) {
      throw new NotFoundException("User not found");
    }
    return userInfo
  }

  async logOut(user: any) {
    const n = await this.userModel.update({ status: 'inactive' }, { where: { email: user.email } })
    const delInfo = await this.tokenModel.destroy({ where: { email: user.email } });

    return { message: 'LogOut successfully' }
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

    if (!byEmail || !byUsername) {
      throw new NotFoundException('User already exists');
    }

    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found")
    }

    const [, [updatedUser]] = await this.userModel.update({ ...updateAuthDto }, { where: { id }, returning: true });
    return updatedUser;
  }

  async remove(id: string) {


    const event = await this.userModel.destroy({ where: { id: id } });
    if (event == 0) {
      throw new NotFoundException("User not found")
    }

    if (event == 1) {
      return { message: "User deleted" }
    }
  }
}
