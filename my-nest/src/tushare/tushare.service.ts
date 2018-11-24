import { Injectable, HttpService, Inject } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Model } from 'mongoose';
// nest-schedule
@Injectable()
export class TushareService {
    constructor(
        private readonly httpService: HttpService,
        @Inject('StockModelToken') private readonly StockModel: Model<any>,
    ) { }

    public baseUrl = 'http://api.tushare.pro';

    public baseToken = '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894';

    public option = {
        storkBaseUrl: {
            api_name: 'stock_basic',
            token: this.baseToken,
            params: {
                list_status: 'L',
            },
            fields: '',
        },
        tradeCalUrl: {
            api_name: 'trade_cal',
            token: this.baseToken,
            params: {
                exchange: 'SSE',
                start_date: '20180101',
                end_date: '20181231',
                is_open: 1,
            },
        },
        hasConstUrl: {
            api_name: 'hs_const',
            token: this.baseToken,
            params: {
                hs_type: 'SH',
                is_new: '1',
            },
        },
        namechangeUrl: {
            api_name: 'namechange',
            token: this.baseToken,
        },
        stockCompanyUrl: {
            api_name: 'stock_company',
            token: this.baseToken,
        },
        newShareUrl: {
            api_name: 'new_share',
            token: this.baseToken,
        },
        dailyUrl: {
            api_name: 'daily',
            token: this.baseToken,
        },
        adjFactorUrl: {
            api_name: 'adj_factor',
            token: this.baseToken,
            params: {
                ts_code: '000001.SZ',
            },
        },
        suspendUrl: {
            api_name: 'suspend',
            token: this.baseToken,
            params: {
                ts_code: '000001.SZ',
            },
        },
        moneyflowHsgtUrl: {
            api_name: 'moneyflow_hsgt',
            token: this.baseToken,
            params: {
                trade_date: '20180725',
            },
        },
        hsgtTop10Url: {
            api_name: 'hsgt_top10',
            token: this.baseToken,
            params: {
                trade_date: '20180725',
                market_type: '1'
            }
        },
        ggtTop10Url: {
            api_name: 'ggt_top10',
            token: this.baseToken,
            params: {
                trade_date: '20180727'
            }
        },
    };
    public httpSet = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    public storkBaseUrl(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.storkBaseUrl;
        }
        return this.basePost(params);
    }

    public tradeCalUrl(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.tradeCalUrl;
        }
        return this.basePost(params);
    }

    async hasConst(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.hasConstUrl;
        }
        return this.basePost(params);
    }

    async namechange(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.namechangeUrl;
        }
        return this.basePost(params);
    }

    async stockCompany(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.stockCompanyUrl;
        }
        return this.basePost(params);
    }

    async newShare(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.newShareUrl;
        }
        return this.basePost(params);
    }

    async daily(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.dailyUrl;
        }
        return this.basePost(params);
    }

    async adjFactor(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.adjFactorUrl;
        }
        return this.basePost(params);
    }

    async suspend(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.suspendUrl;
        }
        return this.basePost(params);
    }

    async moneyflowHsgt(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.moneyflowHsgtUrl;
        }
        return this.basePost(params);
    }

    async hsgtTop10(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.hsgtTop10Url;
        }
        return this.basePost(params);
    }

    async ggtTop10(params) {
        if (!params || JSON.stringify(params) === '{}') {
            params = this.option.ggtTop10Url;
        }
        return this.basePost(params);
    }

    public basePost(params) {
        return this.httpService.post(this.baseUrl, params, this.httpSet).pipe(map(res => {
            let returnData = res.data;
            if (+returnData.code === 0) {
                this.setData(params.api_name, returnData.data);
            } else {
                this.StockModel.find({ name: params.api_name }).exec().then(resData => {
                    returnData = resData[0].data;
                });
            }
            return returnData;
        }));
    }

    async setData(type, dataObj?): Promise<any> {
        const oldModal = this.StockModel.find({ name: type }).exec();
        oldModal.then(res => {
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.StockModel.updateOne({ name: type }, { data: dataObj }, {}, (err, raw) => {
                    // console.log(err);
                    // console.log(raw);
                });
            } else {
                const createPic = new this.StockModel({ data: dataObj, name: type });
                createPic.save();
            }
        });
    }
}
