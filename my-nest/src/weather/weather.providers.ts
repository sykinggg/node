import { Connection } from 'mongoose';
import { WeatherSchema } from './schemas/weather.schema';

export const WeatherProviders = [
    {
        provide: 'WeaterModelToken',
        useFactory: (connection: Connection) => connection.model('Weater', WeatherSchema),
        inject: ['DbConnectionToken'],
    },
];