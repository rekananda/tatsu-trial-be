import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Users as UserModel, Prisma } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post()
  // async createUser(@Body() userData: { email: string; password: string; name?: string }): Promise<UserModel> {
  //   return this.userService.createUser(userData);
  // }

  // @Get(':id')
  // async getUserById(@Param('id') id: string): Promise<Omit<UserModel, 'password' | 'solanaPrivateKey'> | null> {
  //   return this.userService.findUserById(id);
  // }

  // @Put(':id')
  // async updateUser(@Param('id') id: string, @Body() userData: Prisma.UsersUpdateInput): Promise<UserModel> {
  //   return this.userService.updateUser(id, userData);
  // }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string): Promise<UserModel> {
  //   return this.userService.deleteUser(id);
  // }
}
