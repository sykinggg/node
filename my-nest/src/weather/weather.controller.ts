import { Controller, Body, Post } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('weather')
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }
    @Post('getOne')
    async getOne(@Body() body): Promise<any> {
        return this.weatherService.getOne(body);
    }

    @Post('weatherDaily')
    async weatherDaily(@Body() body): Promise<any> {
        return this.weatherService.weatherDaily(body);
    }

    @Post('weatherGridNow')
    async weatherGridNow(@Body() body): Promise<any> {
        return this.weatherService.weatherGridNow(body);
    }

    @Post('weatherGridHourly3h')
    async weatherGridHourly3h(@Body() body): Promise<any> {
        return this.weatherService.weatherGridHourly3h(body);
    }

    @Post('weatherGridHourly_history')
    async weatherGridHourly_history(@Body() body): Promise<any> {
        return this.weatherService.weatherGridHourly_history(body);
    }

    @Post('lifeSuggestion')
    async lifeSuggestion(@Body() body): Promise<any> {
        return this.weatherService.lifeSuggestion(body);
    }
}
