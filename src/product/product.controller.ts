import { ProductDto } from './dto/product.dto';
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Post('/')
  createProduct(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }
}
