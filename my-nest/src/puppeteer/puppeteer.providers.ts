import { Connection } from 'mongoose';
import { PupPicSchema } from './schemas/PupPic.schema';

export const PupPicProviders = [
    {
        provide: 'PupPicModelToken',
        useFactory: (connection: Connection) => connection.model('PupPic', PupPicSchema),
        inject: ['DbConnectionToken'],
    },
];