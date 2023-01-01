import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { UserNickName, UserResponse } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiTags('user')
  @ApiOperation({ summary: 'ログインしているユーザーのユーザー情報を取得' })
  @ApiResponse({
    type: UserResponse,
  })
  getLoginUser(@Req() req: Request): Omit<User, 'password'> {
    console.log(req);
    return req.user;
  }

  @Patch()
  @ApiTags('user')
  @ApiOperation({ summary: 'ログインしているユーザーのニックネーム更新' })
  @ApiBody({ type: UserNickName })
  @ApiResponse({
    type: UserResponse,
  })
  updateUser(
    @Req() req: Request,
    @Body() dto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.updateUser(req.user.id, dto);
  }
}
