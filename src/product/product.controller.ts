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
import { Product } from '@prisma/client';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ProductEntity,
  ProductId,
  ProductBody,
} from './entities/product.entity';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  @ApiTags('product')
  @ApiOperation({ summary: '製品情報全件取得' })
  @ApiResponse({
    type: ProductEntity,
    isArray: true,
  })
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }

  @Get(':id')
  @ApiTags('product')
  @ApiOperation({ summary: '製品情報ID取得' })
  @ApiBody({ type: ProductId })
  @ApiResponse({ type: ProductEntity })
  getProductById(@Param('id', ParseIntPipe) productId: number) {
    return this.productService.getProductById(productId);
  }

  @Post('/')
  @ApiTags('product')
  @ApiOperation({ summary: '製品情報作成' })
  @ApiBody({ type: ProductBody })
  @ApiResponse({ type: ProductEntity })
  createProduct(@Body() dto: ProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  @ApiTags('product')
  @ApiOperation({ summary: '製品情報更新' })
  @ApiBody({ type: ProductBody })
  @ApiResponse({ type: ProductEntity })
  updateProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: ProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  @ApiTags('product')
  @ApiBody({ type: ProductId })
  @ApiOperation({ summary: '製品情報削除' })
  deleteProductById(
    @Param('id', ParseIntPipe) productId: number,
  ): Promise<void> {
    return this.productService.deleteProductById(productId);
  }
}
