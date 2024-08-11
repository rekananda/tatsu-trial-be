import { Controller, Post, Body, UseGuards, Request, Get, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from './AuthDTO';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 201, description: 'User successfully logged in.' })
  @ApiResponse({ status: 400, description: 'Invalid email or password.' })
  async login(@Body() body: LoginUserDto) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new BadRequestException('Invalid email or password.');
    }
    return this.authService.login(user);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered.' })
  @ApiResponse({ status: 400, description: 'Invalid input.' })
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Get detail logged user' })
  getProfile(@Request() req) {
    return req.user;
  }
}
