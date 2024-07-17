import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './entities/auth.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { MailerModule } from '../mailer/mailer.module';
import { Otp } from './entities/otp.entity';

@Module({
  imports: [
    MailerModule,
    SequelizeModule.forFeature([User, Otp]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
