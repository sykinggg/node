import { Model } from 'mongoose';
import * as path from 'path';
import { Injectable, Inject } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { PupCommonService } from './service/common';

@Injectable()
export class PuppeteerService {

    constructor(
        @Inject('PupPicModelToken') private readonly pupPicModel: Model<any>,
        private pupCommonService: PupCommonService,
    ) { }

    // 转换为图片
    async pic(data: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        if (data.http) {
            await page.goto(data.http);
        }
        await page.waitFor(data.waitFor || 1000);
        await this.pupCommonService.autoScroll(page);
        const result = await page.screenshot({
            path: '1.png',
            fullPage: true,
        });
        await browser.close();
        return result;
    }

    // 转换为pdf
    async pdf(data: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        if (data.http) {
            await page.goto(data.http);
        }
        await page.waitFor(data.waitFor || 1000);
        await page.emulateMedia('screen');
        const result = await page.pdf({
            path: './1.pdf',
        });
        await browser.close();
        return result;
    }

    // 获取特定数据
    async getData(data: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        if (data.http) {
            await page.goto(data.http);
        }
        await page.waitFor(data.waitFor || 1000);
        const result = await page.evaluate((arg) => {
            const returnData = []; // 初始化空数组来存储数据
            for (const opt of arg.option) {
                const elements = document.querySelectorAll(opt.selector); // 获取所有书籍元素
                const opData = {};
                opData[opt.name] = [];
                for (const element of elements) {
                    const domData = element[opt.attr]; // 获取数据
                    opData[opt.name].push(domData);
                    returnData.push(opData); // 存入数组
                }
            }

            return returnData; // 返回数据
        }, data);
        await browser.close();
        return result;
    }

    // mm131获取基础分类
    private mm131Url = 'http://www.mm131.com/';
    async getMm131BasicClass(data?: any): Promise<any> {
        if (!data) {
            data = {};
        }
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        await page.goto(this.mm131Url);
        await page.waitFor(data.waitFor || 1000);

        const result = await page.evaluate((arg) => {
            const returnData = []; // 初始化空数组来存储数据
            const elements = document.querySelectorAll('.nav a');
            for (const element of elements) {
                const opData = {
                    name: (element as HTMLElement).innerText,
                    href: element.getAttribute('href'),
                };
                returnData.push(opData); // 存入数组
            }

            return returnData; // 返回数据
        }, data);

        let setData = await result;
        if (setData) {
            this.pupCommonService.setData('getMm131BasicClass', setData);
        } else {
            setData = await this.pupCommonService.getData('getMm131BasicClass');
        }

        return setData;
    }

    // mm131获取详情
    async getMm131GetDetails(data?: any): Promise<any> {

        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        await page.goto(data.href);
        await page.waitFor(data.waitFor || 1000);

        const result = await page.evaluate((arg) => {
            let pageObj: any = [];

            // 获取每一页的地址
            const pageElements = document.querySelectorAll('.public-box dd.page a');
            for (const pElement of pageElements) {
                pageObj.push(pElement.getAttribute('href'));
            }

            let prefix, suffix, num;
            num = pageObj[pageObj.length - 1].split('_');
            prefix = pageObj[pageObj.length - 1].split('_');
            prefix = prefix.slice(0, prefix.length - 1);
            prefix = prefix.join('_');
            num = num[num.length - 1].split('.');
            suffix = num[num.length - 1];
            suffix = '.' + suffix;
            num = +num[0];

            pageObj = [];
            for (let i = 1; i < num + 1; i++) {
                if (i === 1) {
                    pageObj.push(arg.href);
                } else {
                    pageObj.push(arg.href + '/' + prefix + '_' + i + suffix);
                }
            }
            return pageObj; // 返回数据
        }, data);

        let rd = await result;
        rd = rd.slice(0, 2);
        const rdData = await this.pupCommonService.getMm131GetPageList(page, rd);
        console.log(rdData);
        // this.pupCommonService.getPic(rdData[0].img);
        return rdData;
    }

    // girl13
    private girl13Url = 'http://www.girl13.com/page/';
    private index;
    async setGirl13GetDetails(data?: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        await page.goto(this.girl13Url + '1');
        await page.waitFor(1000);

        const result = await page.evaluate((arg) => {
            const index = (document.querySelector('body > ol > li:nth-child(13) > a') as HTMLElement).innerText;

            return { index }; // 返回数据
        }, data, this);

        const resultObj = await result;
        if (!this.index) {
            this.index = +resultObj.index;
        }
        const ListData = await this.pupCommonService.getGirl13List(page, this.girl13Url, this.index);
        // ListData = ListData[0].returnData;
        // console.log(ListData);
        await browser.close();
        if (ListData) {
            this.pupCommonService.setData('getGirl13GetDetails', ListData);
        }
        return ListData;
    }

    async getGirl13GetDetails(data?: any): Promise<any> {
        const ListData = await this.pupCommonService.getData('getGirl13GetDetails');
        return ListData;
    }

    // mzitu
    private mzituUrl = 'https://www.mzitu.com/';
    async setMzituUrlGetDetails(data?: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        await page.goto(this.mzituUrl);
        await page.waitFor(1000);
        const resource = await page._client.send('Page.getResourceTree');
        console.log(resource);
        return resource;
    }
}
