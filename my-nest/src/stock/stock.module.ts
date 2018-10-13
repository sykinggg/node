import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { DatabaseModule } from '../data-base/dataBase.module';
import { StockProviders } from './stock.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [StockController],
    providers: [StockService, ...StockProviders],
})
export class StockModule {}
