import { Injectable, Inject, HttpService } from '@nestjs/common';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import * as moment from 'moment';
import * as querystring from 'querystring';
import * as HmacSHA256 from 'crypto-js/hmac-sha256';
import { map } from 'rxjs/internal/operators/map';

@Injectable()
export class WeatherService {
    private APIKey: string;
    private UId: string;
    private url: string;
    private getOneUrl: string;

    constructor(
        @Inject('WeaterModelToken') private readonly weaterModel: Model<any>,
        private readonly httpService: HttpService,
    ) {
        this.APIKey = 'vowxstbuzpfncofh';
        this.UId = 'UAD067E1DB';
        this.url = 'https://api.seniverse.com/v3';
    }

    public getOne(bodyObj) {
        let url = this.url + '/weather/now.json?key=' + this.APIKey + '&location=' + bodyObj.params.addressStr + '&language=zh-Hans&unit=m';
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }

    public weatherDaily(body) {
        let url = this.url + '/weather/daily.json';
        url += '?language=zh-Hans&unit=m';
        url += '&key=' + this.APIKey;
        url += '&location=' + body.params.addressStr;
        url += '&start=' + body.params.start || 0;
        url += '&days=' + body.params.days || 5;
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }

    public weatherGridNow(body) {
        let url = this.url + '/pro/weather/grid/now.json';
        url += '?key=' + this.APIKey;
        url += '&location=39.865927:116.359805';
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }

    public weatherGridHourly3h(body) {
        let url = this.url + '/pro/weather/grid/hourly3h.json';
        url += '?key=' + this.APIKey;
        url += '&location=39.865927:116.359805';
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }

    public weatherGridHourly_history(body) {
        let url = this.url + '/pro/weather/grid/hourly_history.json';
        url += '?key=' + this.APIKey;
        url += '&location=39.865927:116.359805';
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }

    public lifeSuggestion(body) {
        let url = this.url + '/life/suggestion.json';
        url += '?key=' + this.APIKey;
        url += '&language=zh-Hans';
        url += '&location=' + body.params.addressStr;
        console.log(url);
        url = encodeURI(url);
        return this.httpService.get(url).pipe(map((resp: any) => {
            // const res = JSON.parse(resp);
            // console.log(resp);
            return resp.data;
        }));
    }
}
