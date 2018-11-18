import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { map } from '../../node_modules/rxjs/operators';

// Access Key
// 811eec14-7f418b58-cd06ef2e-b2da9

// Secret Key
// cec55738-d451ccf5-7a74965e-b06c7

@Injectable()
export class HuobiService {
    constructor(
        @Inject('HoubiModelToken') private readonly huobiModel: Model<any>,
        private readonly httpService: HttpService,
    ) { }

    public BASE_URL = 'https://api.huobi.br.com';

    public httpPostSet = {
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'zh-cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        }
    }

    public httpGetSet = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'zh-cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        }
    }

    public getText(): any {
        const url = this.BASE_URL + '/market/depth?symbol=xrpbtc&type=step0';
        console.log(url);
        return this.httpService.get(url).pipe(map((res: any) => {
            console.log(res.status);
            console.log(res.data);
            let returnData = [];
            if(res.status == '200') {
                returnData = res.data;
            }
            return returnData;
        }));
    }

    public getMarketDepth(req): any {
        const url = this.BASE_URL + '/market/depth';
        return this.httpService.get(url, req).pipe(map((res: any) => {
            let returnData = [];
            if(res.status == '200') {
                returnData = res.data;
            }
            return returnData;
        }));
    }

    public getCommonCurrencys(): any {
        const url = this.BASE_URL + '/v1/common/currencys';
        return this.httpService.get(url).pipe(map((res: any) => {}))
    }
}
