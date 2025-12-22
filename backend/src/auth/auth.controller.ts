import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException, Patch } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    console.log('Login attempt:', body);
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      console.log('Invalid credentials for:', body.email);
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body() userData: { email: string; password: string; name: string; phoneNumber: string }) {
    return this.authService.register(userData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authService.getUserProfile(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('profile') // Import Patch from @nestjs/common
  async updateProfile(@Request() req, @Body() body: { name?: string; phoneNumber?: string; photoURL?: string }) {
    return this.authService.updateUser(req.user.userId, body);
  }
}
