import { Connection } from 'mongoose';
import { AiDataBaseSchema } from './schemas/ai.schema';

export const aisProviders = [
    {
        provide: 'AiDataBaseModelToken',
        useFactory: (connection: Connection) => connection.model('AiDataBase', AiDataBaseSchema),
        inject: ['DbConnectionToken'],
    },
];
