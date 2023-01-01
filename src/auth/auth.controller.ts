import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthResponseMsg, AuthRequestBody } from './entities/auth.entity';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interface/auth.interface';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('/csrf')
  // getCsrfToken(@Req() req: Request): Csrf {
  //   return { csrfToken: req.csrfToken() };
  // }

  @Post('/signup')
  @ApiTags('auth')
  @ApiOperation({ summary: 'アカウント作成' })
  @ApiBody({
    type: AuthRequestBody,
  })
  @ApiResponse({
    type: AuthResponseMsg,
  })
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiTags('auth')
  @ApiOperation({ summary: 'ログイン' })
  @ApiBody({
    type: AuthRequestBody,
  })
  @ApiResponse({
    type: AuthResponseMsg,
  })
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: 'ok',
    };
  }

  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  @ApiTags('auth')
  @ApiOperation({ summary: 'ログアウト' })
  @ApiResponse({
    type: AuthResponseMsg,
  })
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false,
      sameSite: 'none',
      path: '/',
    });

    return {
      message: 'ok',
    };
  }
}
