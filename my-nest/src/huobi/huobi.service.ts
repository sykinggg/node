import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { map } from '../../node_modules/rxjs/operators';

import * as crypto from 'crypto';
import * as ccxt from 'ccxt';

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
    public SECRET_KEY = 'cec55738-d451ccf5-7a74965e-b06c7';
    public ACCESS_KEY = '811eec14-7f418b58-cd06ef2e-b2da9';

    public NO_SIGNATURE_API = [
        'getCommonCurrencys',
        'marketHistoryKline',
        'marketDetailMerged',
        'marketTickers',
        'marketDepth',
        'marketTrade',
        'marketHistoryTrade',
        'marketDetail',
        'v1CommonSymbols',
        'v1CommonTimestamp',
    ];

    public httpPostSet = {
        headers: {
            'Content-Type': 'application/json',
            'Accept-Language': 'zh-cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        },
    };

    public httpGetSet = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Language': 'zh-cn',
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        },
    };

    // 接口测试
    public getText(): any {
        const url = this.BASE_URL + '/market/depth?symbol=xrpbtc&type=step0';
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }

    /**
     *  无签名请求(行情查询)
     */

    // 交易币种列表
    public getCommonCurrencys(body): any {
        const url = this.BASE_URL + '/v1/common/currencys';
        return this.httpService.get(url, body).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }

    // 历史K线
    public marketHistoryKline(body): any {
        const url = this.BASE_URL + '/market/history/kline?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 滚动24小时交易和最优报价聚合行情(单个symbol)
    public marketDetailMerged(body): any {
        const url = this.BASE_URL + '/market/detail/merged?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 全部symbol的交易行情
    public marketTickers(body): any {
        const url = this.BASE_URL + '/market/tickers';
        return this.httpService.get(url, body).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 市场深度行情（单个symbol）
    public marketDepth(body): any {
        const url = this.BASE_URL + '/market/depth?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 单个symbol最新成交记录
    public marketTrade(body): any {
        const url = this.BASE_URL + '/market/trade?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 单个symbol批量成交记录
    public marketHistoryTrade(body): any {
        const url = this.BASE_URL + '/market/history/trade?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 滚动24小时交易聚合行情(单个symbol)
    public marketDetail(body): any {
        const url = this.BASE_URL + '/market/detail?symbol=' + body.symbol;
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 交易品种的计价货币和报价精度
    public v1CommonSymbols(body): any {
        const url = this.BASE_URL + '/v1/common/symbols';
        return this.httpService.get(url, body).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }
    // 查询当前系统时间
    public v1CommonTimestamp(body): any {
        const url = this.BASE_URL + '/v1/common/timestamp';
        return this.httpService.get(url, body).pipe(map((res: any) => {
            let returnData = [];
            if (+res.status === 200) {
                returnData = res.data;
            }
            return returnData;
        }));
    }

    /**
     *  签名请求(账户查询&交易)
     */

    // 查询用户的所有账户状态
    public v1AccountAccounts(body): any {
        const urlStr = 'GET\napi.huobi.br.com\n/v1/account/accounts\n';
        const pStr = 'AccessKeyId=811eec14-7f418b58-cd06ef2e-b2da9&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T16:22:06';
        const str = urlStr + pStr;
        const signature = crypto.createHmac('sha1', this.SECRET_KEY).update(str).digest().toString('base64');
        const url = this.BASE_URL + '/v1/account/accounts?' + pStr + '&Signature=' + signature;
        console.log('console.log(signature);');
        console.log(signature);
        console.log(Date.now());
        return this.httpService.get(url).pipe(map((res: any) => {
            let returnData = [];
            console.log(res.data);
            if (+res.status === 200) {
                returnData = res.data;
            }
            return signature;
        }));
    }
}
