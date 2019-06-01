import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { AiService } from './ai.service';
import { DatabaseModule } from 'data-base/dataBase.module';
import { aisProviders } from './ai.providers';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        AiController,
    ],
    providers: [
        AiService,
        ...aisProviders,
    ],
})
export class AiModule { }
