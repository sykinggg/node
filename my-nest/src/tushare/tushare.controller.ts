import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { TushareService } from './tushare.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('tushare')
export class TushareController {
    constructor(private tushareService: TushareService) {}
    @Post('storkBaseUrl')
    async storkBaseUrl(@Body() request): Promise<any> {
        return this.tushareService.storkBaseUrl(request);
    }
}
