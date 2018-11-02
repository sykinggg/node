import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import { of } from 'rxjs';

@Injectable()
export class HuobiService {
    constructor(
        @Inject('HoubiModelToken') private readonly huobiModel: Model<any>,
        private readonly httpService: HttpService,
    ) { }

    BASE_URL = 'https://api.huobi.br.com';

    public getText(): any {
        const url = this.BASE_URL + '/market/depth?symbol=xrp,btc&type=step0';
        return of(this.httpService.get(url));
    }
}
