import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class PupCommonService {
    constructor(
        @Inject('PupPicModelToken') private readonly pupPicModel: Model<any>,
        private readonly httpService: HttpService,
    ) { }

    // 自动滚动到底部
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

    // 获取每一页的列表数据
    pageListIdx = 0;
    pageList = [];
    async getMm131GetPageList(page, datas): Promise<any> {
        const data = datas[this.pageListIdx];
        console.log(`第${this.pageListIdx}页开始`);
        await page.goto(data);
        await page.waitFor(1000);

        const result = await page.evaluate((arg) => {
            const returnData = [];

            // 获取每一页的地址
            const elements = document.querySelectorAll('.public-box dd a');
            for (const element of elements) {
                const img = element.querySelector('img');
                if (img && img.getAttribute('alt')) {
                    const opData = {
                        name: img.getAttribute('alt'),
                        href: element.getAttribute('href'),
                        img: img.getAttribute('src'),
                    };
                    returnData.push(opData); // 存入数组
                }
            }
            return returnData; // 返回数据
        }, data);

        this.pageList = this.pageList.concat(await result);
        console.log(`第${this.pageListIdx}页结束`);
        this.pageListIdx++;

        if (this.pageListIdx < datas.length - 1) {
            return await this.getMm131GetPageList(page, datas);
        } else {
            await this.getMm131GetDetailsList(page, this.pageList);
        }

        return this.pageList;
    }

    // 获取列表中的详情数据
    detailsIdx = 0;
    detailsList = [];
    async getMm131GetDetailsList(page, datas): Promise<any> {
        const data = datas[this.detailsIdx];
        // console.log(datas);
        // console.log(`第${this.detailsIdx}页开始`);
        await page.goto(data.href);
        await page.waitFor(1000);

        const result = await page.evaluate((arg) => {
            const returnData = [];

            // 获取每一页的地址
            const reg = /[\u4e00-\u9fa5]/g;
            let element = (document.querySelector('.content-page .page-ch') as HTMLElement).innerText;
            element = element.replace(reg, '');
            const baseUrl = document.querySelector('body > div.content > div.content-pic > a > img').getAttribute('src');
            const prefixArr = baseUrl.split('/').slice(0, baseUrl.split('/').length - 1);
            const prefix = prefixArr.join('/');
            const elementNum = +element;
            if (!isNaN(+element)) {
                for (let i = 0; i < elementNum; i++) {
                    returnData.push(prefix + '/' + i + '.jpg');
                }
            }
            return returnData; // 返回数据
        }, data);
        if (!data.details) {
            data.details = [];
        }
        data.details = data.details.concat(await result);

        if (this.detailsIdx < data.length) {
            return await this.getMm131GetDetailsList(page, datas);
        }

        return result;
    }

    // girl13 list
    private getGirl13ListIdx = 1;
    private getGirl13ListData = [];
    async getGirl13List(page, url, num): Promise<any> {
        await page.goto(url + this.getGirl13ListIdx, {waitUntil: 'load', timeout: 0});
        await page.waitFor(1000);
        // console.log(`第${this.getGirl13ListIdx}页开始`);
        // const result = await page.evaluate((arg) => {
        //     const returnData = []; // 初始化空数组来存储数据
        //     const aElements = document.querySelectorAll('#loop-square .column-post .entry-content a');

        //     for (const element of aElements) {
        //         if (element.querySelector('img')) {
        //             returnData.push({
        //                 img: element.querySelector('img') ? element.querySelector('img').getAttribute('src') : '',
        //                 name: element.querySelector('img') ? element.querySelector('img').getAttribute('alt') : '',
        //             });
        //         }
        //     }

        //     return { returnData }; // 返回数据
        // });

        const resource = await page._client.send('Page.getResourceTree');
        // console.log(resource.frameTree);
        if (resource && resource.frameTree && resource.frameTree.resources && Array.isArray(resource.frameTree.resources)) {
            for (const item of resource.frameTree.resources) {
                if (item.type === 'Image' && item.mimeType === 'image/jpeg') {
                    this.getGirl13ListData.push(item.url);
                }
            }
        }

        console.log(`第${this.getGirl13ListIdx}页结束共${num}页`);
        if (this.getGirl13ListIdx < num) {
            this.getGirl13ListIdx++;
            await this.getGirl13List(page, url, num);
        }

        return this.getGirl13ListData;
    }

    // 写入数据
    public setData(type, data?): void {
        const oldModal = this.pupPicModel.find({ name: type }).exec();
        oldModal.then(res => {
            // console.log(res);
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.pupPicModel.updateOne({ name: type }, { address: data }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
                });
            } else {
                const createPic = new this.pupPicModel({ address: data, name: type });
                createPic.save();
            }
            // this.picModel.find({ name: type }).exec().then(data => {
            //     console.log(data);
            // });
        });
    }

    // 获取数据
    public getData(type): void {
        const oldModal = this.pupPicModel.find({ name: type }).exec();
        return oldModal.then(res => {
            return res[0].address;
        });
    }

    async getPic(url?) {
        this.httpService.get(url, {
            headers: {
                'Pragma': 'no-cache',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,ja;q=0.8,en;q=0.7',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
                'Referer': 'http://www.mm131.com/xinggan/',
            },
        }).pipe(map((item: any) => {
            console.log(item);
        }));

        return null;
    }
}