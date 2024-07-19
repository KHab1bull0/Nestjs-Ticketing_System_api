import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from '../mailer/mailer.module';
import { JwtModule } from '@nestjs/jwt';
import { Otp } from './entities/otp.entity';
import { User } from './entities/auth.entity';
import { Token } from './entities/token.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeORm } from './entities/userTypeOrm..entity';

@Module({
  imports: [
    MailerModule,
    SequelizeModule.forFeature([User, Otp, Token]),
    TypeOrmModule.forFeature([UserTypeORm]),
    JwtModule.register({
      global: true
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
