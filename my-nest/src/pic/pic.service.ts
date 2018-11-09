import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { Pic } from './interfaces/pic.interface';
import * as phantom from 'phantom';
import * as cheerio from 'cheerio';
import { Subject, Observable } from 'rxjs';

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
            length: 48,
        },
        'mmJpg': {
            head: 'http://www.mmjpg.com/tag/meitui/',
            foot: '',
            length: 12,
        },
    };

    public subject: Subject<any> = new Subject<any>();

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
    async getPic(type): Promise<any> {
        if (!this.picAdd || !this.picAdd.length) {
            this.picAdd = this.getPicAdd(type);
        }
        if (this.n > this.picAdd.length - 1) {
            console.log(this.imgsrc);
            console.log('完成');
            this.imgsrc = [...new Set(this.imgsrc)];
            this.setData(type);
            this.setChangeData(true);
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
                const imgUrl = $(ele).attr('data-original');
                if (imgUrl) {
                    this.imgsrc.push('http://www.5aav.com' + imgUrl);
                }
            });
        } else if (type === 'jiandan') {
            $('.text img').each((i, ele) => {
                const imgUrl = $(ele).attr('src');
                if (imgUrl) {
                    this.imgsrc.push(imgUrl);
                }
            });
        } else if (type === 'mmJpg') {
            $('.pic img').each((i, elem) => {
                const imgUrl = $(elem).attr('src');
                if (imgUrl) {
                    this.imgsrc.push(imgUrl);
                }
            });
        }
        console.log('第' + idx + '个页面完成');
        this.n++;
        await instance.exit();
        this.getPic(type);
        console.log(this.imgsrc);
    }

    public setData(type, data?): void {
        const oldModal = this.picModel.find({ name: type }).exec();
        oldModal.then(res => {
            // console.log(res);
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.picModel.updateOne({ name: type }, { address: data || this.imgsrc }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
                });
            } else {
                const createPic = new this.picModel({ address: data || this.imgsrc, name: type });
                createPic.save();
            }
            // this.picModel.find({ name: type }).exec().then(data => {
            //     console.log(data);
            // });
        });
    }

    public setChangeData(data): void {
        this.subject.next({ changeData: data });
    }
    public getChangeData(): Observable<any> {
        return this.subject.asObservable();
    }

    async findType(type): Promise<Pic[]> {
        return await this.picModel.find({ name: type }).exec();
    }

    async deleteOne(type): Promise<any> {
        return await this.picModel.remove({ name: type });
    }

    async deleteAll(): Promise<any> {
        return await this.picModel.remove();
    }

    async uploadedFile(file): Promise<any> {
        console.log(file);
        await this.setData('file', file);
        return 'success';
    }
}
