import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { TushareService } from './tushare.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('tushare')
export class TushareController {
    constructor(private tushareService: TushareService) {}

    // 股票列表
    @Post('storkBaseUrl')
    async storkBaseUrl(@Body() body): Promise<any> {
        return this.tushareService.storkBaseUrl(body);
    }

    // 交易日历
    @Post('tradeCalUrl')
    async tradeCalUrl(@Body() body): Promise<any> {
        return this.tushareService.tradeCalUrl(body);
    }

    // 沪深股通成份股
    @Post('hsConst')
    async hsConst(@Body() body): Promise<any> {
        return this.tushareService.hasConst(body);
    }

    // 股票曾用名
    @Post('namechange')
    async namechange(@Body() body): Promise<any> {
        return this.tushareService.namechange(body);
    }

    // 上市公司基本信息
    @Post('stockCompany')
    async stockCompany(@Body() body): Promise<any> {
        return this.tushareService.stockCompany(body);
    }

    // IPO新股列表
    @Post('newShare')
    async newShare(@Body() body): Promise<any> {
        return this.tushareService.newShare(body);
    }

    // 日线行情
    @Post('daily')
    async daily(@Body() body): Promise<any> {
        return this.tushareService.daily(body);
    }

    // 复权因子
    @Post('adjFactor')
    async adjFactor(@Body() body): Promise<any> {
        return this.tushareService.adjFactor(body);
    }

    // 停复牌信息
    @Post('suspend')
    async suspend(@Body() body): Promise<any> {
        return this.tushareService.suspend(body);
    }

    // 沪深港通资金流向
    @Post('moneyflowHsgt')
    async moneyflowHsgt(@Body() body): Promise<any> {
        return this.tushareService.moneyflowHsgt(body);
    }

    // 沪深股通十大成交股
    @Post('hsgtTop10')
    async hsgtTop10(@Body() body): Promise<any> {
        return this.tushareService.hsgtTop10(body);
    }

    // 港股通十大成交股
    @Post('ggt_top10')
    async ggtTop10(@Body() body): Promise<any> {
        return this.tushareService.ggtTop10(body);
    }

    // 融资融券交易汇总
    @Post('margin')
    async margin(@Body() body): Promise<any> {
        return this.tushareService.margin(body);
    }

    // 融资融券交易明细
    @Post('margin_detail')
    async marginDetail(@Body() body): Promise<any> {
        return this.tushareService.marginDetail(body);
    }

    // 前十大股东
    @Post('top10_holders')
    async top10Holders(@Body() body): Promise<any> {
        return this.tushareService.top10Holders(body);
    }

    // 前十大流通股东
    @Post('top10_floatholders')
    async top10Floatholders(@Body() body): Promise<any> {
        return this.tushareService.top10Floatholders(body);
    }

    // 指数基本信息
    @Post('index_basic')
    async indexBasic(@Body() body): Promise<any> {
        return this.tushareService.indexBasic(body);
    }

    @Post('index_daily')
    async indexDaily(@Body() body): Promise<any> {
        return this.tushareService.indexDaily(body);
    }
}
