import { Module } from '@nestjs/common';
import { PicController } from './pic.controller';
import { PicService } from './pic.service';
import { PicProviders } from './pic.providers';
import { DatabaseModule } from 'data-base/dataBase.module';

@Module({
    imports: [DatabaseModule],
    controllers: [PicController],
    providers: [PicService, ...PicProviders],
    exports: [PicService],
})
export class PicModule {}
