import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import * as phantom from 'phantom';
import * as cheerio from 'cheerio';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StockService {
    constructor(@Inject('stockModelToken') private readonly StockModel: Model<any>) { }

    stockUrl = 'http://hq.sinajs.cn/list=code';
    async stock(res): Promise<any> {
        
        return [];
    }
}
