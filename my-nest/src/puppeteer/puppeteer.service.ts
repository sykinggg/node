import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {

    constructor() { }

    async pic(data: any): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        if (data.http) {
            await page.goto(data.http);
        }
        await page.waitFor(data.waitFor || 1000);
        await this.autoScroll(page);
        const result = await page.screenshot({
            path: '1.png',
            fullPage: true,
        });
        await browser.close();
        return result;
    }

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

    public autoScroll(page: any) {
        return page.evaluate(() => {
            return new Promise((resolve, reject) => {
                let totalHeight = 0;
                const distance = 100;
                const timer = setInterval(() => {
                    // tslint:disable-next-line:prefer-const
                    let scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if (totalHeight >= scrollHeight) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
        });
    }
}
