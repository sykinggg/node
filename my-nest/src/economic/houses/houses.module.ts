import { Module } from '@nestjs/common';
import { HousesController } from './houses.controller';
import { HousesService } from './houses.service';
import { HousesProviders } from './houses.providers';
import { DatabaseModule } from 'data-base/dataBase.module';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        HousesController,
    ],
    providers: [
        HousesService,
        ...HousesProviders,
    ],
    exports: [
        HousesService,
    ],
})
export class HousesModule { }
