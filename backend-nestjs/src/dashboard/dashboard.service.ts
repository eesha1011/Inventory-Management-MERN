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

    async getPopularProducts() {
        return this.productModel
        .find()
        .sort({sold: -1})
        .limit(7)
        .select('name category price stock image sold');
    }

    async getSalesSummary(type: 'weekly' | 'monthly') {
        const products = await this.productModel.find();
        const chart: Record<string, number> = {};
        let totaSales = 0;

        products.forEach(product => {
            const date = new Date(product.createdAt);
            
            const label = type === 'weekly' ? `${date.getDate()}/${date.getMonth() + 1}` : `${date.getMonth() + 1}/${date.getFullYear()}`;
            
            const sales = (product.price || 0) * (product.sold || 0);
            totaSales += sales;
            chart[label] = (chart[label] || 0) + sales;
        });

        const chartData = Object.entries(chart).map(([day, sales]) => ({
            day,
            sales: Number(sales),
        }));

        return {
            totaSales,
            growth: 5.48,
            hightestSalesDate: chartData.length ? chartData.sort((a, b) => b.sales - a.sales)[0].day : null,
            chart: chartData,
        };
    }
}
