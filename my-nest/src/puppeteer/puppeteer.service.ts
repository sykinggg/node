import { Injectable } from '@nestjs/common';

@Injectable()
export class PuppeteerService {

    async pic(data: any): Promise<any> {
        console.log(data);
        return null;
    }

    async ftp(data: any): Promise<any> {
        console.log(data);
        return null;
    }
}
