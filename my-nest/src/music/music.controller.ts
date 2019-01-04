import { Controller, Get } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    @Get('text')
    async text(): Promise<any> {
        return await this.musicService.text();
    }
}
