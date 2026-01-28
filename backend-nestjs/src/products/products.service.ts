import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name)
        private productModel: Model<Product>,
    ) {}

    async createProduct(dto: CreateProductDto) {
        const product = new this.productModel({
            name: dto.name,
            category: dto.category,
            price: dto.price,
            stock: dto.stock,
        });
        return product.save();
    }

    async getAllProducts() {
        return this.productModel.find().exec();
    }

    async getProductById(id: string) {
        const product = await this.productModel.findById(id).exec();
        if(!product){
            throw new NotFoundException('Product not found');
        }
        return product;
    }

    async updateProduct(id: string, dto: UpdateProductDto) {
       const updatedProduct = await this.productModel.findByIdAndUpdate(id, dto, {new: true}); 
       if(!updatedProduct){
        throw new NotFoundException('Product not found');
       }
       return updatedProduct;
    }
    
    async deleteProduct(id: string) {
        const deletedProduct = await this.productModel.findByIdAndDelete(id);
        if(!deletedProduct){
            throw new NotFoundException('Product not found');
        }
        return {message: 'Product deleted successfully'};
    }
}
