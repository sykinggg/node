import { Controller, Post, Body } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {

    constructor(private readonly puppeteerService: PuppeteerService) { }

    @Post('/pic')
    async pic(@Body() data: any) {
        this.puppeteerService.pic(data);
    }

    @Post('/ftp')
    async ftp(@Body() data: any) {
        this.puppeteerService.ftp(data);
    }
}
