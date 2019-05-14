import { Controller, Post, Body, Get } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { async } from 'rxjs/internal/scheduler/async';

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

    @Get('/getMm131BasicClass')
    async getMm131BasicClass() {
        return this.puppeteerService.getMm131BasicClass();
    }

    @Post('/getMm131GetDetails')
    async getMm131GetDetails(@Body() data: any) {
        return this.puppeteerService.getMm131GetDetails(data);
    }

    @Post('/getGirl13GetDetails')
    async getGirl13GetDetails(@Body() data: any) {
        return this.puppeteerService.getGirl13GetDetails(data);
    }

    @Post('/setGirl13GetDetails')
    async setGirl13GetDetails(@Body() data: any) {
        return this.puppeteerService.setGirl13GetDetails(data);
    }

    @Post('/setMzituUrlGetDetails')
    async setMzituUrlGetDetails(@Body() data: any) {
        return this.puppeteerService.setMzituUrlGetDetails(data);
    }
}
