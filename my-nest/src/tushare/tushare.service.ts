import { Injectable, HttpService } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class TushareService {
    constructor(private readonly httpService: HttpService) { }

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

    public postTextList(req) {
        return this.httpService.post(this.baseUrl, this.baseOption, this.httpSet).pipe(map(res => {
            return res.data;
        }));
    }
}
