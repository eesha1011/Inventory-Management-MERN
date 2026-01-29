import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/schemas/product.schema';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Product.name) private productModel: Model<Product>,
    ) {}

    async getStats() {
        const usersCount = await this.userModel.countDocuments();
        // const activeUsers = await this.userModel.countDocuments({isActive: true});
        const productsCount = await this.productModel.countDocuments(); 

        return {
            usersCount,
            // activeUsers,
            productsCount,
        };
    }

    async getCategoryStats() {
        return this.productModel.aggregate([
            {
                $group: {_id: `$category`, value: {$sum: 1},},
            },
            {
                $project: {_id: 0, name: `$_id`, value: 1,},
            },
        ]);
    }
}
