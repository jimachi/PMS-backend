import { Injectable } from '@nestjs/common';
import { ProductDto } from './dto/product.dto';
import { PrismaService } from './../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  getProducts(): Promise<Product[]> {
    return this.prisma.product.findMany({
      orderBy: {
        createAt: 'desc',
      },
    });
  }

  createProduct(dto: ProductDto): Promise<Product> {
    const product = this.prisma.product.create({
      data: {
        ...dto,
      },
    });

    return product;
  }
}
