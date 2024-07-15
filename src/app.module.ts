import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
