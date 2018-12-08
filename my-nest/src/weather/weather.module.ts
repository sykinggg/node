import { Module, HttpModule } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { DatabaseModule } from 'data-base/dataBase.module';
import { WeatherProviders } from './weather.providers';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [WeatherController],
    providers: [WeatherService, ...WeatherProviders],
})
export class WeatherModule { }
