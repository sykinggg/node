import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as phantom from 'phantom';
import * as cheerio from 'cheerio';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class HousesService {
    constructor(
        @Inject('HousesModelToken') private readonly HousesModule: Model<any>,
    ) { }

    async grawlDataLianjiaCity(body): Promise<any> {
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        const status = await page.open('https://www.lianjia.com/city/');
        if (status === 'success' && false) {
            const content = await page.property('content');
            const $ = cheerio.load(content);
            const data: any = [];
            $('.city_list_ul .city_province').each((i, elem) => {
                const subData: any = [];
                $(elem).find('ul li a').each((si, sElem) => {
                    subData.push({
                        city: $(sElem).text(),
                        href: $(sElem).attr('href'),
                    });
                });
                data.push({
                    title: $(elem).find('.city_list_tit').text(),
                    child: subData,
                });
            });
            this.setData('grawlDataLianjiaCity', data);
            await instance.exit();
            return data;
        } else {
            await instance.exit();
            return this.getData('grawlDataLianjiaCity');
        }
    }

    public setData(type, data?): void {
        const oldModal = this.HousesModule.find({ name: type }).exec();
        oldModal.then(res => {
            // console.log(res);
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.HousesModule.updateOne({ name: type }, { data }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
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

    public getData(type): Promise<any> {
        return this.HousesModule.find({ name: type }).exec().then(data => {
            console.log(data[0]);
            return data[0];
        });
    }
}
