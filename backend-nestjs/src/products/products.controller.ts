import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    create(@Body() dto: CreateProductDto){
        return this.productsService.createProduct(dto);
    }

    @Get()
    findAll(){
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.productsService.getProductById(id);
    }

    @Put(':id')
    update(@Param('id') id:string, @Body() dto: UpdateProductDto){
        return this.productsService.updateProduct(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}

