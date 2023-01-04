import { ProductDto } from './dto/product.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Patch,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }

  @Post('/')
  createProduct(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: ProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProductById(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this.productService.deleteProductById(productId);
  }
}
