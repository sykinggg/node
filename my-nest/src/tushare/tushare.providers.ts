import { Connection } from 'mongoose';
import { StockListSchema } from './schemas/stockList.schema';

export const StockListProviders = [
    {
        provide: 'StockModelToken',
        useFactory: (connection: Connection) => connection.model('Stock', StockListSchema),
        inject: ['DbConnectionToken'],
    },
];