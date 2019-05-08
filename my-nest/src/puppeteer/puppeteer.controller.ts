import { Controller, Post, Body } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';

@Controller('puppeteer')
export class PuppeteerController {

    constructor(private readonly puppeteerService: PuppeteerService) { }

    @Post('/pic')
    async pic(@Body() data: any) {
        return this.puppeteerService.pic(data);
    }

    @Post('/pdf')
    async pdf(@Body() data: any) {
        return this.puppeteerService.pdf(data);
    }

    @Post('/getData')
    async getData(@Body() data: any) {
        return this.puppeteerService.getData(data);
    }
}
