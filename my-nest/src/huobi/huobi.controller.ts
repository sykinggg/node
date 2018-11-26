import { Controller, Req, Get, Post, Body } from '@nestjs/common';
import { HuobiService } from './huobi.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('huobi')
export class HuobiController {
    constructor(private readonly huobiService: HuobiService) { }

    // 接口测试
    @Get('text')
    async houbiText(@Req() request): Promise<any> {
        return this.huobiService.getText();
    }

    // 交易币种列表
    @Get('list')
    async huobiList(@Req() request): Promise<any> {
        return this.huobiService.getCommonCurrencys(request);
    }

    // 无需签名的接口请求
    @Post('noSignature')
    async noSignature(@Body() body): Promise<any> {
        let returnData = '请输入正确的apiType';
        if (this.huobiService.NO_SIGNATURE_API.indexOf(body.apiType) + 1) {
            returnData = this.huobiService[body.apiType](body);
        }
        return returnData;
    }

    // 查询用户的所有账户状态
    @Post('signature')
    async signature(@Body() body): Promise<any> {
        return this.huobiService.v1AccountAccounts(body);
    }

    // 查询指定账户余额
    @Post('v1AccountAccountsbalance')
    async v1AccountAccountsbalance(@Body() body): Promise<any> {
        return this.huobiService.v1AccountAccountsbalance(body);
    }

    // 查询当前委托、历史委托
    @Post('get_open_orders')
    async get_open_orders(@Body() body): Promise<any> {
        return this.huobiService.get_open_orders(body);
    }
}
