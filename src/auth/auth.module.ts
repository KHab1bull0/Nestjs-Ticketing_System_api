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

@Module({
  imports: [
    MailerModule,
    SequelizeModule.forFeature([User, Otp, Token]),
    JwtModule.register({
      global: true
    })
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
