import { ApiProperty } from '@nestjs/swagger';

export class ProductId {
  @ApiProperty()
  id: 1;
}

export class ProductBody {
  @ApiProperty()
  name: '製品';
  @ApiProperty()
  price: 20000;
}

export class ProductEntity {
  @ApiProperty()
  id: 1;
  @ApiProperty()
  name: '製品1';
  @ApiProperty()
  price: 10000;
  @ApiProperty()
  createdAt: '2023-01-01T10:40:34.487Z';
  @ApiProperty()
  updatedAt: '2023-01-01T10:40:34.487Z';
}
