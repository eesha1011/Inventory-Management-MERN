import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}

    @Get('stats')
    getDashboardStats() {
        return this.dashboardService.getStats();
    }

    @Get('category-pie')
    getCategoryPie() {
        return this.dashboardService.getCategoryStats();
    }

    @Get('popular-products')
    getPopularproducts() {
        return this.dashboardService.getPopularProducts();
    }

    @Get('sales-summary')
    getSalesSummary(@Query("type") type: string) {
        return this.dashboardService.getSalesSummary(
            type === "monthly" ? "monthly" : "weekly"
        );
    }
}
