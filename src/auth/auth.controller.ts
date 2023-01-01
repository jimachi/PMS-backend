import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interface/auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Get('/csrf')
  // getCsrfToken(@Req() req: Request): Csrf {
  //   return { csrfToken: req.csrfToken() };
  // }

  @Post('/signup')
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }
}
