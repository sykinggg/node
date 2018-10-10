import { Connection } from 'mongoose';
import { PicSchema } from './schemas/pic.schema';

export const PicProviders = [
    {
        provide: 'PicModelToken',
        useFactory: (connection: Connection) => connection.model('Pic', PicSchema),
        inject: ['DbConnectionToken'],
    },
];