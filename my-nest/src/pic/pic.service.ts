import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pic } from './interfaces/pic.interface';
import * as phantom from 'phantom';
import * as cheerio from 'cheerio';

@Injectable()
export class PicService {

    constructor(@Inject('PicModelToken') private readonly picModel: Model<any>) { }

    url = {
        '5aav': {
            head: 'http://www.5aav.com/xgmv/list_1_',
            foot: '.html',
            length: 56,
        },
        'jiandan': {
            head: 'http://jandan.net/ooxx/page-',
            foot: '',
            length: 5,
        },
    };

    private getPicAdd(type): any {
        const options = [];
        for (let i = 1; i < this.url[type].length; i++) {
            options.push(this.url[type].head + i + this.url[type].foot);
        }
        return options;
    }

    n = 0;
    imgsrc = [];
    picAdd = [];
    async get5aavPic(type) {
        if (!this.picAdd || !this.picAdd.length) {
            this.picAdd = this.getPicAdd(type);
        }
        if (this.n > this.picAdd.length - 1) {
            console.log(this.imgsrc);
            console.log('完成');
            this.imgsrc = [...new Set(this.imgsrc)];
            const createPic = new this.picModel({ address: this.imgsrc, name: type });
            await createPic.save();
            return this.imgsrc;
        }
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        const status = await page.open(this.picAdd[this.n]);
        const content = await page.property('content');
        const $ = cheerio.load(content);
        const idx = this.n + 1;
        if (idx === 1) {
            this.imgsrc = [];
        }
        console.log('第' + idx + '个页面准备');
        if (type === '5aav') {
            $('.postlist img').each((i, ele) => {
                this.imgsrc.push('http://www.5aav.com' + $('.postlist img').attr('data-original'));
            });
        } else if (type === 'jiandan') {
            $('.commentlist img').each((i, ele) => {
                this.imgsrc.push($('.commentlist img').attr('src'));
            });
        }
        console.log('第' + idx + '个页面完成');
        this.n++;
        await instance.exit();
        this.get5aavPic(type);
        console.log(this.imgsrc);
    }

    async findAllPic(type): Promise<Pic[]> {
        return await this.picModel.find({ name: type }).exec();
    }

    async deleteAll(): Promise<any> {
        return await this.picModel.remove();
    }
}
