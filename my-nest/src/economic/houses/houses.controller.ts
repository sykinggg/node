import { Controller, Post, Body, Get } from '@nestjs/common';
import { HousesService } from './houses.service';

@Controller('houses')
export class HousesController {
    constructor(private readonly housesService: HousesService) {}

    // 爬取数据
    @Get('grawlDataLianjiaCity')
    async grawlDataLianjiaCity(@Body() body): Promise<any> {
        console.log(body);
        return this.housesService.grawlDataLianjiaCity(body);
    }
}
