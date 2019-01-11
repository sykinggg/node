import { Module, HttpModule } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MusicProvider } from './music.provider';
import { DatabaseModule } from 'data-base/dataBase.module';

@Module({
    imports: [DatabaseModule, HttpModule],
    controllers: [MusicController],
    providers: [MusicService, ...MusicProvider],
    exports: [MusicService],
})
export class MusicModule { }
