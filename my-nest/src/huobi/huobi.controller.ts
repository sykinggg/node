import { Controller, Req, Get } from '@nestjs/common';
import { HuobiService } from './huobi.service';

@Controller('huobi')
export class HuobiController {
    constructor(private readonly huobiService: HuobiService) { }

    @Get('text')
    async houbiText(@Req() request): Promise<any> {
        this.huobiService.getText().subscribe(res => {
            console.log(res);
        });
        return [];
    }
}
