import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseMsg {
  @ApiProperty()
  message: 'ok';
}

export class AuthRequestBody {
  @ApiProperty()
  email: 'test@example.com';
  @ApiProperty()
  password: 'password';
}
