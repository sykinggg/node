import { Connection } from 'mongoose';
import { HousesSchema } from './schemas/houses.schema';

export const HousesProviders = [
    {
        provide: 'HousesModelToken',
        useFactory: (connection: Connection) => connection.model('House', HousesSchema),
        inject: ['DbConnectionToken'],
    },
];