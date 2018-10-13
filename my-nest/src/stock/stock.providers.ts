import { Connection } from 'mongoose';
import { StockSchema } from './schemas/stock.schema';

export const StockProviders = [
    {
        provide: 'stockModelToken',
        useFactory: (connection: Connection) => connection.model('stock', StockSchema),
        inject: ['DbConnectionToken'],
    },
];