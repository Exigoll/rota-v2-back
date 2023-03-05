import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  update(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto);
  }
}
