import { Module, HttpModule } from '@nestjs/common';
import { PuppeteerController } from './puppeteer.controller';
import { PuppeteerService } from './puppeteer.service';
import { DatabaseModule } from 'data-base/dataBase.module';
import { PupCommonService } from './service/common';
import { PupPicProviders } from './puppeteer.providers';

@Module({
    imports: [
        DatabaseModule,
        HttpModule,
    ],
    controllers: [
        PuppeteerController,
    ],
    providers: [
        PuppeteerService,
        PupCommonService,
        ...PupPicProviders,
    ],
})
export class PuppeteerModule { }
