import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as phantom from 'phantom';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

export interface Ipagination {
    allPage: number;
    baseHref: string;
    indexPage: number;
    pagePrefix: string;
    type: string;
}

export interface IGrawlDataLianjiaCityURLData {
    noresultRecommend: {
        title: string;
        img: string;
    };
    info: {
        title: {
            name: string;
            href: string;
            tagBlock: string;
        };
        address: string;
        flood: string;
        followInfo: string;
        priceInfo: {
            totalPrice: string;
            unitPrice: string;
        };
    };
}

@Injectable()
export class HousesService {
    constructor(
        @Inject('HousesModelToken') private readonly HousesModule: Model<any>,
    ) { }

    /**
     * 链家
     */

    // 获取链家城市
    async grawlDataLianjiaCity(body): Promise<any> {
        const browser = await (puppeteer.launch({ headless: true }));
        const page = await browser.newPage();
        await page.goto('https://www.lianjia.com/city/');
        await page.waitFor(1000);

        let data: any = await page.evaluate(() => {
            const dataObj: any = [];
            const city_province = document.querySelectorAll('.city_list_ul .city_province');
            city_province.forEach(item => {
                const sArr = [];
                item.querySelectorAll('ul li a').forEach(sElem => {
                    sArr.push({
                        name: sElem.innerHTML,
                        href: sElem.getAttribute('href'),
                    });
                });
                dataObj.push({
                    name: item.querySelector('.city_list_tit').innerHTML,
                    child: sArr,
                });
            });
            return dataObj;
        });
        if (data.length) {
            this.setData('grawlDataLianjiaCity', data);
        } else {
            data = this.getData('grawlDataLianjiaCity');
        }
        // page.$$('.city_list_ul .city_province').then(item => {
        //     if (Array.isArray(item)) {
        //         item.forEach(async elem => {
        //             const city_list_tit = await elem.$eval('.city_list_tit', node => node.innerText);
        //             const ulliaText = await elem.$eval('ul li a', node => node.innerText);
        //             const ulliaHref = await elem.$eval('ul li a', node => node.href);
        //             console.log(city_list_tit);
        //             data.push({
        //                 name: city_list_tit,
        //                 child: [{
        //                     name: ulliaText,
        //                     href: ulliaHref,
        //                 }],
        //             });
        //             // name: city_list_tit,
        //             //     child: [{
        //             //         name: ulliaText,
        //             //         href: ulliaHref,
        //             //     }],
        //             // data.push({
        //             //     name: await elem.$eval('.city_list_tit', node => node.innerText),
        //             //     child: [{
        //             //         name: await elem.$eval('ul li a', node => node.innerText),
        //             //         href: await elem.$eval('ul li a', node => node.href),
        //             //     }],
        //             // });
        //         });
        //     }
        // });
        return data;
        // const data = await page.evaluate(() => {
        //     console.log(document.querySelectorAll('.city_list_ul .city_province'));
        //     document.querySelectorAll('.city_list_ul .city_province').forEach((elem, i) => {
        //         console.log(elem);
        //         const subData: any = [];
        //         elem.querySelectorAll('ul li a').forEach((sElem, si) => {
        //             console.log(sElem.innerHTML);
        //             subData.push({
        //                 name: sElem.innerHTML,
        //                 href: sElem.getAttribute('href'),
        //             });
        //         });
        //         return {
        //             name: elem.querySelector('.city_list_tit').innerHTML,
        //             child: subData,
        //         };
        //     });
        // });

        // const instance = await phantom.create();
        // const page = await instance.createPage();
        // await page.on('onResourceRequested', (requestData) => {
        //     //   console.info('Requesting', requestData.url);
        // });
        // const status = await page.open('https://www.lianjia.com/city/');
        // if (status === 'success') {
        //     const content = await page.property('content');
        //     const $ = cheerio.load(content);
        //     const data: any = [];
        //     $('.city_list_ul .city_province').each((i, elem) => {
        //         const subData: any = [];
        //         $(elem).find('ul li a').each((si, sElem) => {
        //             subData.push({
        //                 name: $(sElem).text(),
        //                 href: $(sElem).attr('href'),
        //             });
        //         });
        //         data.push({
        //             name: $(elem).find('.city_list_tit').text(),
        //             child: subData,
        //         });
        //     });
        //     this.setData('grawlDataLianjiaCity', data);
        //     await instance.exit();
        //     return data;
        // } else {
        //     await instance.exit();
        //     return this.getData('grawlDataLianjiaCity');
        // }
    }

    // 根据前端获取的地址获取数据
    grawlDataLianjiaCityURLData: Array<IGrawlDataLianjiaCityURLData>;
    async grawlDataLianjiaCityURL(body): Promise<any> {
        let allPage;
        if (body.href) {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', (requestData) => {
                //   console.info('Requesting', requestData.url);
            });
            // 不同类型的房屋信息
            const status = await page.open(body.href + body.flag.value);
            if (status === 'success') {
                const content = await page.property('content');
                const $ = cheerio.load(content);
                // 获取总页数
                allPage = $($('.house-lst-page-box a')[$('.house-lst-page-box a').length - 2]).attr('data-page');
                const paginationOption = {
                    allPage,
                    baseHref: body.href + 'ershoufang/',
                    indexPage: 1,
                    pagePrefix: 'pg',
                    type: body.name,
                };
                this.grawlDataLianjiaCityURLData = [];
                await this.pagination(paginationOption);
                return '开始爬取';
            }
        }
    }

    // 获取爬虫信息
    async getGrawlDataLianjiaCityURLData(event) {
        return this.getData(event.name);
    }

    // 递归进行爬取
    async pagination(data: Ipagination) {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        // 不同类型的房屋信息
        // console.log(data.baseHref + data.pagePrefix + data.indexPage + '/');
        console.log('第' + data.indexPage + '页' + '共' + data.allPage + '页');
        const status = await page.open(data.baseHref + data.pagePrefix + data.indexPage + '/');
        if (status === 'success') {
            const content = await page.property('content');
            const $ = cheerio.load(content);
            setTimeout(() => {
                $('.LOGCLICKDATA').each((i, elem) => {
                    const arrayData: IGrawlDataLianjiaCityURLData = {
                        noresultRecommend: {
                            title: $($(elem).find('.noresultRecommend img')[0]).attr('alt'),
                            img: $($(elem).find('.noresultRecommend img')[0]).attr('src'),
                        },
                        info: {
                            title: {
                                name: $($(elem).find('.info .title a')[0]).text(),
                                href: $($(elem).find('.info .title a')[0]).attr('href'),
                                tagBlock: $($(elem).find('.info .title .tagBlock')[0]).text(),
                            },
                            address: $($(elem).find('.address .houseInfo')[0]).text(),
                            flood: $($(elem).find('.flood .positionInfo')[0]).text(),
                            followInfo: $($(elem).find('.followInfo')[0]).text(),
                            priceInfo: {
                                totalPrice: $($(elem).find('.priceInfo .totalPrice')[0]).text(),
                                unitPrice: $($(elem).find('.priceInfo .unitPrice')[0]).text(),
                            },
                        },
                    };
                    this.grawlDataLianjiaCityURLData.push(arrayData);
                });
            });
        }

        await instance.exit();

        if (+data.indexPage < +data.allPage) {
            data.indexPage = +data.indexPage + 1;
            this.pagination(data);
        } else {
            console.log('爬取完成');
            this.setData(data.type, this.grawlDataLianjiaCityURLData);
        }

    }

    /**
     * 安居客
     */
    // 获取安居客城市
    async grawlDataAnjukeCity(body): Promise<any> {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        const status = await page.open('https://www.anjuke.com/sy-city.html');

        if (status === 'success') {
            const content = await page.property('content');
            const $ = cheerio.load(content);
            // tslint:disable-next-line:prefer-const
            let data: Array<any> = [];
            await $('.letter_city li').each((i, elem) => {
                // tslint:disable-next-line:prefer-const
                let child: Array<any> = [];
                $($(elem).find('.city_list a')).each((si, selem) => {
                    child.push({
                        name: $(selem).text(),
                        href: $(selem).attr('href'),
                    });
                });
                data.push({
                    name: $($(elem).find('.label_letter')[0]).text(),
                    child,
                });
            });
            this.setData('grawlDataAnjukeCity', data);
            await instance.exit();
            return data;
        } else {
            await instance.exit();
            return this.getData('grawlDataAnjukeCity');
        }
    }

    /**
     * 贝壳
     */
    // 获取贝壳城市
    async grawlDataKeCity(body): Promise<any> {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        const status = await page.open('https://www.ke.com/city/');

        if (status === 'success') {
            const content = await page.property('content');
            const $ = cheerio.load(content);
            // tslint:disable-next-line:prefer-const
            let data: Array<any> = [];
            $('.city_list_ul .city_list_li .city_province').each((i, elem) => {
                // tslint:disable-next-line:prefer-const
                let child: Array<any> = [];
                $(elem).find('.CLICKDATA').each((si, selem) => {
                    if ($($(selem).find('a')[0]).text()) {
                        const childName = $($(selem).find('a')[0]).text().replace(/ |↵/g, '');
                        child.push({
                            name: childName,
                            href: $($(selem).find('a')[0]).attr('href'),
                        });
                    }
                });
                const name = $($(elem).find('.city_list_tit')[0]).text().replace(/ |↵/g, '');
                data.push({
                    name,
                    child,
                });
            });

            this.setData('grawlDataKeCity', data);
            await instance.exit();
            return data;
        } else {
            await instance.exit();
            return this.getData('grawlDataKeCity');
        }
    }
    // 获取前端爬虫地址进行数据拉取 似乎是做了防爬取设置
    grawlDataKeCityURLData: any;
    async grawlDataKeCityURL(body) {
        if (body.href) {
            const instance = await phantom.create();
            const page = await instance.createPage();
            await page.on('onResourceRequested', (requestData) => {
                //   console.info('Requesting', requestData.url);
            });
            // 不同类型的房屋信息
            const url = body.href + '/' + body.flag.value;
            const status = await page.open(url);
            if (status === 'success') {
                const content = await page.property('content');
                const $ = cheerio.load(content);
                // 获取总页数
                const allPage = $($('.content__pg a')[$('.content__pg a').length - 2]).attr('data-page');
                // const paginationOption = {
                //     allPage,
                //     baseHref: body.href + body.flag + '/',
                //     indexPage: 1,
                //     pagePrefix: 'pg',
                //     type: body.name,
                // };
                this.grawlDataKeCityURLData = [];
                // await this.pagination(paginationOption);
                return '开始爬取';
            }
        }
    }

    // 数据写入数据库
    public setData(type, data?): void {
        const oldModal = this.HousesModule.find({ name: type }).exec();
        oldModal.then(res => {
            // console.log(res);
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.HousesModule.updateOne({ name: type }, { data }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
                    this.getData(type);
                });
            } else {
                const createPic = new this.HousesModule({ data, name: type });
                createPic.save();
            }
            // this.picModel.find({ name: type }).exec().then(data => {
            //     console.log(data);
            // });
        });
    }

    // 从数据库中取得数据
    public getData(type): Promise<any> {
        return this.HousesModule.find({ name: type }).exec().then(data => {
            // console.log(data);
            return data[0].data;
        });
    }
}
