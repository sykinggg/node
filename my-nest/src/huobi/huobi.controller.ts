import { Controller, Req, Get, Post, Body } from '@nestjs/common';
import { HuobiService } from './huobi.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('huobi')
export class HuobiController {
    constructor(private readonly huobiService: HuobiService) { }

    @Get('text')
    async houbiText(@Req() request): Promise<any> {
        return this.huobiService.getText();
    }

    @Get('list')
    async huobiList(@Req() request): Promise<any> {
        return this.huobiService.getCommonCurrencys(request);
    }

    @Post('noSignature')
    async noSignature(@Body() body): Promise<any> {
        let returnData = '请输入正确的apiType';
        if (this.huobiService.NO_SIGNATURE_API.indexOf(body.apiType) + 1) {
            returnData = this.huobiService[body.apiType](body);
        }
        return returnData;
    }

    @Post('signature')
    async signature(@Body() body): Promise<any> {
        return this.huobiService.v1AccountAccounts(body);
    }
}
