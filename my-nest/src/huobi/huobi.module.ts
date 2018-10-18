import { Module, HttpModule } from '@nestjs/common';
import { HuobiController } from './huobi.controller';
import { HuobiService } from './huobi.service';
import { HoubiProviders } from './huobi.providers';
import { DatabaseModule } from 'data-base/dataBase.module';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [HuobiController],
    providers: [HuobiService, ...HoubiProviders],
})
export class HuobiModule { }
