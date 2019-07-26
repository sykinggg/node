import { Controller, Post, Body, Get } from '@nestjs/common';
import { PuppeteerService } from './puppeteer.service';
import { async } from 'rxjs/internal/scheduler/async';

/**
 *
 * puppeteer chrome 工具
 * @export
 * @class PuppeteerController
 */
@Controller('puppeteer')
export class PuppeteerController {

    constructor(private readonly puppeteerService: PuppeteerService) { }

    /**
     *
     * 生成网页的 pic
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/pic')
    async pic(@Body() data: any) {
        return this.puppeteerService.pic(data);
    }

    /**
     *
     * 生成网页的 pdf
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/pdf')
    async pdf(@Body() data: any) {
        return this.puppeteerService.pdf(data);
    }

    /**
     *
     * 获取数据
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/getData')
    async getData(@Body() data: any) {
        return this.puppeteerService.getData(data);
    }

    /**
     *
     * mm131获取基础分类
     * @returns
     * @memberof PuppeteerController
     */
    @Get('/getMm131BasicClass')
    async getMm131BasicClass() {
        return this.puppeteerService.getMm131BasicClass();
    }

    /**
     *
     * mm131获取详情
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/getMm131GetDetails')
    async getMm131GetDetails(@Body() data: any) {
        return this.puppeteerService.getMm131GetDetails(data);
    }

    /**
     *
     * 获取 Girl13 页面 详情
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/getGirl13GetDetails')
    async getGirl13GetDetails(@Body() data: any) {
        return this.puppeteerService.getGirl13GetDetails(data);
    }

    /**
     *
     * 获取 girl13 详情
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/setGirl13GetDetails')
    async setGirl13GetDetails(@Body() data: any) {
        return this.puppeteerService.setGirl13GetDetails(data);
    }

    /**
     *
     * 获取 mzitu 数据
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/setMzituUrlList')
    async setMzituUrlList(@Body() data: any) {
        return this.puppeteerService.setMzituUrlList(data);
    }

    /**
     *
     * 获取 Mzitu 数据
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/setMzituUrlGetDetails')
    async setMzituUrlGetDetails(@Body() data: any) {
        return this.puppeteerService.setMzituUrlGetDetails(data);
    }

    /**
     *
     * 爬取页面详情
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/setMzituUrlGetPageDetails')
    async setMzituUrlGetPageDetails(@Body() data: any) {
        return this.puppeteerService.setMzituUrlGetPageDetails(data);
    }

    /**
     *
     * 获取页面详情
     * @param {*} data
     * @returns
     * @memberof PuppeteerController
     */
    @Post('/getMzituUrlGetPageDetails')
    async getMzituUrlGetPageDetails(@Body() data: any) {
        return this.puppeteerService.getMzituUrlGetPageDetails(data);
    }
}
