import * as mongoose from 'mongoose';

export const DataBase = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (): Promise<mongoose.Connection> => await mongoose.connect('mongodb://localhost:27018'),
    },
];
