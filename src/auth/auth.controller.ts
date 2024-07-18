import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserRegisterDto } from './dto/auth.register.dto';
import { OtpDto } from './dto/otp.dto';
import { LoginDto } from './dto/Login.dto';
import { AuthGuard } from 'src/middleware/auth.guard';
import { Role, Roles } from 'src/middleware/role.decorator';



@Controller('user')
export class AuthController {

  roles: Role[];
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

  @Get('/getMe')
  @UseGuards(AuthGuard)
  async getMe(@Request() req) {
    return this.authService.getMe(req.user);
  }

  @Post("/refreshToken")
  async refresh(@Body() token: { rToken: string }) {
    return this.authService.refreshToken(token.rToken)
  }

  @Post('/logout')
  @UseGuards(AuthGuard)
  async logOut(@Request() req) {

    return this.authService.logOut(req.user);
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
