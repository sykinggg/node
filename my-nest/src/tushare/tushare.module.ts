import { Module, HttpModule } from '@nestjs/common';
import { TushareController } from './tushare.controller';
import { TushareService } from './tushare.service';

@Module({
    imports: [HttpModule],
    controllers: [TushareController],
    providers: [TushareService],
})
export class TushareModule { }
