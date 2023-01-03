import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty()
  email: 'test@example.com';
  @ApiProperty()
  userName: 'test';
  @ApiProperty()
  createdAt: '2023-01-01T10:40:34.487Z';
  @ApiProperty()
  updatedAt: '2023-01-01T10:40:34.487Z';
}

export class UserNickName {
  @ApiProperty()
  nickname?: 'userName';
}
