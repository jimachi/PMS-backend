import { Injectable, ForbiddenException } from '@nestjs/common';
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

  getProductById(productId: number): Promise<Product> {
    return this.prisma.product.findUnique({
      where: {
        id: productId,
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

  updateProduct(productId: number, dto: ProductDto): Promise<Product> {
    const product = this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ForbiddenException("Can't find product");
    }

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProductById(productId: number): Promise<void> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new ForbiddenException("product can't find");
    }

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
