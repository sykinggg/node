import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CatsService {
    constructor(@Inject('CatModelToken') private readonly catModel: Model<Cat>) { }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }

    async text(): Promise<any> {

        const browser = await (puppeteer.launch({ headless: false }));
        const page = await browser.newPage();
        // 进入页面
        await page.goto('https://www.jianshu.com/p/2f04f9d665ce');

        // tslint:disable-next-line:max-line-length
        // await page.click(`#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img`);

        await page.waitFor(1000);

        const result = await page.evaluate(() => {
            const title = document.querySelectorAll('body > div.note > div.post > div.article > h1')[0].innerHTML;
            return {
                title,
            };
        });

        setTimeout(() => {
            browser.close();
        });

        return result;
    }

    async ismDoSomething(): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        let result = null;

        // 进入页面 公司的项目6s加载完成 666
        // await page.goto('http://192.168.20.51/#/login');

        // await page.waitFor(6000);

        // page.type('#loginUsername', 'admin');
        // page.type('body > app-root > app-login > div.panel > div.panel-body > form > div:nth-child(2) > input', 'admins');
        // result = await page.evaluate(() => {
        //     const loginUsername = document.querySelector('#loginUsername').innerHTML;
        //     tslint:disable-next-line:max-line-length
        //     const password = document.querySelectorAll('body > app-root > app-login > div.panel > div.panel-body > form > div:nth-child(2) > input')[0].innerHTML;
        //     tslint:disable-next-line:max-line-length
        //     const aa = document.querySelectorAll('body > app-root > app-login > div.panel > div.panel-body > form > div:nth-child(3) > div > label > span')[0].innerHTML;
        //     const a = document.querySelectorAll('body > app-root > app-login > div.panel > p')[0].innerHTML;
        //     return {
        //         loginUsername,
        //         password,
        //         aa,
        //         a,
        //     };
        // });
        // page.click('body > app-root > app-login > div.panel > div.panel-body > form > div.row > div > button');

        // 进入页面 自己的项目
        // await page.goto('http://localhost:4200/data-interaction/houses');

        // result = page.evaluate(() => {
        // tslint:disable-next-line:max-line-length
        //     const a = document.querySelectorAll('body > app-root > app-layout-header > nz-layout > nz-layout > app-data-interaction > app-layout-slider > nz-layout > nz-sider > div.ant-layout-sider-children > ul > li.ng-tns-c4-1.ant-menu-item.ng-star-inserted.ant-menu-item-selected > span > span')[0].innerHTML;
        //     return {
        //         a,
        //     };
        // });

        await page.goto('https://www.cnblogs.com/morethink/p/6525216.html');
        // await page.setViewport({
        //     width: 1200,
        //     height: 800,
        // });

        // 滚动到页面底部
        // await this.autoScroll(page);

        // 截图
        // result = await page.screenshot({
        //     path: '1.png',
        //     fullPage: true,
        // });

        // pdf
        await page.emulateMedia('screen');
        result = await page.pdf({
            path: './1.pdf',
        });

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
