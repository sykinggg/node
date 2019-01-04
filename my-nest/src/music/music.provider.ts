import { Connection } from 'mongoose';
import { MusicSchema } from './schemas/music.schema';

export const MusicProvider = [
    {
        provide: 'MusicModelToken',
        useFactory: (connection: Connection) => connection.model('Music', MusicSchema),
        inject: ['DbConnectionToken'],
    },
];