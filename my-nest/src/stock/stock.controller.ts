import { Controller, Get, Req } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
    constructor(private readonly stockService: StockService) {}

    @Get('stockSet')
    async stockSet(@Req() request): Promise<any> {
        console.log(request.query);
        return await this.stockService.stock(request.query.type);
    }
}
