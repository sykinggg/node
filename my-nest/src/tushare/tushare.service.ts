import { Injectable, HttpService, Inject } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Model } from 'mongoose';

@Injectable()
export class TushareService {
    constructor(
        private readonly httpService: HttpService,
        @Inject('StockModelToken') private readonly StockModel: Model<any>,
    ) { }

    public baseUrl = 'http://api.tushare.pro';
    public baseOption = {
        api_name: 'stock_basic',
        token: '05e2421bfbccb31a09a5009e9b00950fd14615a02dca4eb077e9c3f4',
        params: {
            list_status: 'L',
        },
        fields: '',
    };
    public httpSet = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    public storkBaseUrl(req) {
        if (!req) {
            req = this.baseOption;
        }
        return this.httpService.post(this.baseUrl, req, this.httpSet).pipe(map(res => {
            let returnData = res.data;
            if (+res.data.code === 0) {
                this.setData(req.api_name, res.data.data);
            }
            returnData = this.StockModel.find({ name: req.api_name }).exec();
            return returnData;
        }));
    }

    public setData(type, dataObj?): void {
        const oldModal = this.StockModel.find({ name: type }).exec();
        oldModal.then(res => {
            // console.log(res);
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
