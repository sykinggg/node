import { Controller, Get, Req, Post } from '@nestjs/common';
import { TushareService } from './tushare.service';

@Controller('tushare')
export class TushareController {
    constructor(private tushareService: TushareService) {}
    @Post('list')
    async getList(@Req() request): Promise<any> {
        return this.tushareService.postTextList(request);
    }

}
