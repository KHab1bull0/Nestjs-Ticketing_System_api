import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRegisterDto } from './dto/auth.register.dto';
import { OtpDto } from './dto/otp.dto';
import { LoginDto } from './dto/Login.dto';



@Controller('user')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  async create(@Body() createAuthDto: UserRegisterDto) {

    return await this.authService.register(createAuthDto);
  }

  @Post('/verify')
  async verifyOtp(@Body() otpDto: OtpDto) {
    return await this.authService.verifyOtp(otpDto)
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.loginUser(loginDto)
  }

  @Get()
  async findAll() {
    return await this.authService.findAll();
  }


  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.authService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return await this.authService.update(id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
