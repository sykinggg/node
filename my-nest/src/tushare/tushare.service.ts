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

    public option = {
        storkBaseUrl: {
            api_name: 'stock_basic',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
            params: {
                list_status: 'L',
            },
            fields: '',
        },
        tradeCalUrl: {
            api_name: 'trade_cal',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
            params: {
                exchange: 'SSE',
                start_date: '20180101',
                end_date: '20181231',
                is_open: 1,
            },
        },
        hasConstUrl: {
            api_name: 'hs_const',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
            params: {
                hs_type: 'SH',
                is_new: '1',
            },
        },
        namechangeUrl: {
            api_name: 'namechange',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
        },
        stockCompanyUrl: {
            api_name: 'namechange',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
        },
        newShareUrl: {
            api_name: 'namechange',
            token: '304bd4b4830d85adf5bee28ae7cc6fe79a5c72e3022f6ca816b83894',
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
