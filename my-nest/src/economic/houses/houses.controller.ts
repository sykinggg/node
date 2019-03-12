import { Controller, Post, Body, Get, Req } from '@nestjs/common';
import { HousesService } from './houses.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('houses')
export class HousesController {
    constructor(private readonly housesService: HousesService) { }

    /**
     * 链家
     */

    // 获取链家城市
    @Get('grawlDataLianjiaCity')
    async grawlDataLianjiaCity(@Body() body): Promise<any> {
        return this.housesService.grawlDataLianjiaCity(body);
    }

    // 获取前端爬虫地址进行数据拉取
    @Post('grawlDataLianjiaCityURL')
    async grawlDataLianjiaCityURL(@Body() body): Promise<any> {
        return this.housesService.grawlDataLianjiaCityURL(body);
    }

    // 将数据传给前端
    @Post('getGrawlDataLianjiaCityURLData')
    async getGrawlDataLianjiaCityURLData(@Body() body): Promise<any> {
        return this.housesService.getGrawlDataLianjiaCityURLData(body);
    }

    /**
     * 安居客
     */
    // 获取安居客城市
    @Get('grawlDataAnjukeCity')
    async grawlDataAnjukeCity(@Req() request): Promise<any> {
        return this.housesService.grawlDataAnjukeCity(request);
    }

    /**
     * 贝壳
     */
    // 获取贝壳城市
    @Get('grawlDataKeCity')
    async grawlDataKeCity(@Req() request): Promise<any> {
        return this.housesService.grawlDataKeCity(request);
    }

    // 获取前端爬虫地址进行数据拉取
    @Post('grawlDataKeCityURL')
    async grawlDataKeCityURL(@Body() body): Promise<any> {
        return this.housesService.grawlDataKeCityURL(body);
    }
}
