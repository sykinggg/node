import { Module, HttpModule } from '@nestjs/common';
import { TushareController } from './tushare.controller';
import { TushareService } from './tushare.service';
import { StockListProviders } from './tushare.providers';
import { DatabaseModule } from 'data-base/dataBase.module';
@Module({
    imports: [HttpModule, DatabaseModule],
    controllers: [TushareController],
    providers: [TushareService, ...StockListProviders],
    exports: [TushareService],
})
export class TushareModule { }
