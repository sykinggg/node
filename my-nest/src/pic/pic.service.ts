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
        'movie_sf': {
            head: 'http://www.xfyy406.com/shaofu/index',
            foot: '.html',
            length: 296,
        },
        'movie_tx': {
            head: 'http://www.xfyy406.com/texie/index',
            foot: '.html',
            length: 106,
        },
        'movie_qj': {
            head: 'http://www.xfyy406.com/qunjiao/index',
            foot: '.html',
            length: 177,
        },
        'movie_yz': {
            head: 'http://www.xfyy406.com/yazhou/index',
            foot: '.html',
            length: 2109,
        },
        'movie_ll': {
            head: 'http://www.xfyy406.com/luanlun/index',
            foot: '.html',
            length: 525,
        },
        'movie_zw': {
            head: 'http://www.xfyy406.com/zhongwen/index',
            foot: '.html',
            length: 952,
        },
    };

    public subject: Subject<any> = new Subject<any>();

    type;

    private getPicAdd(type): any {
        this.type = type;
        const options = [];
        for (let i = 1; i < this.url[type].length + 1; i++) {
            if (i !== 1 || !(type.indexOf('movie') + 1)) {
                options.push(this.url[type].head + i + this.url[type].foot);
            } else {
                options.push(this.url[type].head.replace('index', ''));
            }
        }
        return options;
    }

    getUrl(type, n?) {
        this.imgsrc = [];
        this.picAdd = [];
        this.n = 0;
        // tslint:disable-next-line:prefer-const
        let urlArr = [], num;
        if (!n) {
            n = 3;
        }
        if (!this.picAdd || !this.picAdd.length) {
            this.picAdd = this.getPicAdd(type);
        }
        num = this.picAdd.length / n;
        if (num % 1) {
            // tslint:disable-next-line:no-bitwise
            num = num | 0;
            num++;
        }
        for (let i = 0; i < n; i++) {
            urlArr[i] = this.picAdd.slice(i * num, (i + 1) * num);
        }
        this.useUrl(urlArr);
    }

    useUrl(list) {
        if (!list.length) {
            return false;
        }
        list.map(url => {
            this.getPic(url);
        });
    }

    n = 0;
    imgsrc = [];
    picAdd = [];
    async getPic(urlList, n?): Promise<any> {
        if (!n) {
            n = 0;
        }
        if (this.n === this.picAdd.length + 1) {
            console.log(this.imgsrc.length);
            console.log('完成');
            this.imgsrc = [...new Set(this.imgsrc)];
            this.setData(this.type);
            this.setChangeData(true);
            this.n++;
            return false;
        }
        if (this.n > this.picAdd.length + 1) {
            return false;
        }
        const instance = await phantom.create();
        const page = await instance.createPage();
        await page.on('onResourceRequested', (requestData) => {
            //   console.info('Requesting', requestData.url);
        });
        const status = await page.open(urlList[n]);
        const content = await page.property('content');
        const $ = cheerio.load(content);
        const idx = this.n + 1;
        // console.log('第' + idx + '个页面准备');
        if (this.type === '5aav') {
            $('.postlist img').each((i, ele) => {
                const imgUrl = $(ele).attr('data-original');
                if (imgUrl) {
                    this.imgsrc.push('http://www.5aav.com' + imgUrl);
                }
            });
        } else if (this.type === 'jiandan') {
            $('.text img').each((i, ele) => {
                const imgUrl = $(ele).attr('src');
                if (imgUrl) {
                    this.imgsrc.push(imgUrl);
                }
            });
        } else if (this.type === 'mmJpg') {
            $('.pic img').each((i, elem) => {
                const imgUrl = $(elem).attr('src');
                if (imgUrl) {
                    this.imgsrc.push(imgUrl);
                }
            });
        } else if (this.type.indexOf('movie') + 1) {
            $('.main .list ul li a').each((i, elem) => {
                $(elem).find('p').each((pi, pelem) => {
                    const name = unescape($(pelem).html().replace(/&#x/g, '%u').replace(/;/g, ''));
                    const imgUrl = $(pelem).parent('a').find('img').attr('src');
                    const detaHref = 'http://www.xfyy406.com' + $(pelem).parent('a').attr('href');
                    this.imgsrc.push({ name, imgUrl, detaHref });
                });
            });
        }
        console.log('第' + idx + '个页面完成');
        this.n++;
        n++;
        await instance.exit();
        this.getPic(urlList, n);
        // console.log(this.imgsrc.length);
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
        return this.picModel.find({ name: type }).exec().then(data => {
            return data[0];
        });
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
