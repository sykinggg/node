import { Module } from '@nestjs/common';
import { HousesModule } from './houses/houses.module';

@Module({
    imports: [
        HousesModule,
    ],
    providers: [],
})
export class EconomicModule { }
