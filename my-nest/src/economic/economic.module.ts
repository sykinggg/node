import { Module } from '@nestjs/common';
import { HousesModule } from './houses/houses.module';

/**
 *
 * 大数据 统计写入
 * @export
 * @class EconomicModule
 */
@Module({
    imports: [
        HousesModule,
    ],
    providers: [],
})
export class EconomicModule { }
