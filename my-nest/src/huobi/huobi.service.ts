import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { map } from '../../node_modules/rxjs/operators';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import * as HmacSHA256 from 'crypto-js/hmac-sha256';

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

    public URL_HUOBI_PRO = 'api.huobi.br.com';
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/depth?symbol=xrpbtc&type=step0';
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/v1/common/currencys';
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/history/kline?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/detail/merged?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/tickers';
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/depth?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/trade?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/history/trade?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/market/detail?symbol=' + body.symbol;
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/v1/common/symbols';
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
        const url = 'https://' + this.URL_HUOBI_PRO + '/v1/common/timestamp';
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

    DEFAULT_HEADERS = {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36',
        'AuthData': '',
    };

    public sign_sha(method, baseurl, path, data) {
        const pars = [];
        for (const item in data) {
            if (item && data[item]) {
                pars.push(item + '=' + encodeURIComponent(data[item]));
            }
        }
        let p = pars.sort().join('&');
        const meta = [method, baseurl, path, p].join('\n');
        // console.log(meta);
        const hash = HmacSHA256(meta, this.SECRET_KEY);
        // console.log(hash);
        const osig = CryptoJS.enc.Base64.stringify(hash);
        // console.log(osig);
        const Signature = encodeURIComponent(osig);
        // console.log(Signature);
        // console.log(`Signature: ${Signature}`);
        p += `&Signature=${Signature}`;
        // console.log(p);
        return p;
    }

    public get_body() {
        return {
            AccessKeyId: this.ACCESS_KEY,
            SignatureMethod: 'HmacSHA256',
            SignatureVersion: 2,
            Timestamp: moment.utc().format('YYYY-MM-DDTHH:mm:ss'),
        };
    }

    public get_auth() {
        const sign = 'replace_mehello, moto';
        const md5 = CryptoJS.MD5(sign).toString().toLowerCase();
        const ret = encodeURIComponent(JSON.stringify({
            assetPwd: md5,
        }));
        return ret;
    }

    private post_call_api(path, payload, body) {
        const url = `https://${this.URL_HUOBI_PRO}${path}?${payload}`;

        const header = this.DEFAULT_HEADERS;
        header.AuthData = this.get_auth();

        let returnData;

        return this.httpService.post(url, body, { headers: header }).pipe(map(res => {
            returnData = res.data;
            if (+returnData.code === 0) {
                this.setData(path, returnData.data);
            } else {
                this.huobiModel.find({ name: path }).exec().then(resData => {
                    returnData = resData[0].data;
                });
            }
            return returnData;
        }));
    }

    private get_call_api(path, payload, body) {
        const url = `https://${this.URL_HUOBI_PRO}${path}?${payload}`;

        const header = this.DEFAULT_HEADERS;
        header.AuthData = this.get_auth();

        let returnData;

        return this.httpService.get(url, { headers: header }).pipe(map(res => {
            returnData = res.data;
            if (+res.status === 200) {
                this.setData(path, returnData.data);
            } else {
                this.huobiModel.find({ name: path }).exec().then(resData => {
                    returnData = resData[0].data;
                });
            }
            return returnData;
        }));
    }

    async setData(type, dataObj?): Promise<any> {
        const oldModal = this.huobiModel.find({ name: type }).exec();
        oldModal.then(res => {
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.huobiModel.updateOne({ name: type }, { data: dataObj }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
                });
            } else {
                const createPic = new this.huobiModel({ data: dataObj, name: type });
                createPic.save();
            }
        });
    }

    // 查询用户的所有账户状态
    public v1AccountAccounts(params): any {
        const path = `/v1/account/accounts`;
        let body = this.get_body();
        body = Object.assign(body, params);
        const payload = this.sign_sha('GET', this.URL_HUOBI_PRO, path, body);
        return this.get_call_api(path, payload, body);
    }

    // 查询指定账户余额
    public v1AccountAccountsbalance(params): any {
        const path = `/v1/account/accounts/${params.account_id}/balance`;
        let body = this.get_body();
        body = Object.assign(body, params);
        const payload = this.sign_sha('GET', this.URL_HUOBI_PRO, path, body);
        return this.get_call_api(path, payload, body);
    }

    // 查询当前委托、历史委托
    public get_open_orders(params): any {
        const path = `/v1/order/orders`;
        const body: any = this.get_body();
        body.symbol = params.symbol;
        body.states = 'submitted,partial-filled';
        const payload = this.sign_sha('GET', this.URL_HUOBI_PRO, path, body);
        return this.get_call_api(path, payload, body);
    }
}
