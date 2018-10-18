import { Connection } from 'mongoose';
import { HoubiSchema } from './schemas/huobi.schema';

export const HoubiProviders = [
    {
        provide: 'HoubiModelToken',
        useFactory: (connection: Connection) => connection.model('Houbi', HoubiSchema),
        inject: ['DbConnectionToken'],
    },
];