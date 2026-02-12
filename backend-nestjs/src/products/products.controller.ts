import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
                cb(null, uniqueName);
            },
        }),
    }),)
    create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateProductDto,){
        console.log(dto);
        return this.productsService.createProduct(dto, file);
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
    @UseInterceptors(
    FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                const uniqueName =
                Date.now() + '-' + Math.round(Math.random() * 1e9) + extname(file.originalname);
                cb(null, uniqueName);
            },
        }),
    }),)
    update(@Param('id') id:string, @UploadedFile() file: Express.Multer.File, @Body() dto: UpdateProductDto){
        return this.productsService.updateProduct(id, dto, file);
    }

    @Delete(':id')
    remove(@Param('id') id: string){
        return this.productsService.deleteProduct(id);
    }
}

