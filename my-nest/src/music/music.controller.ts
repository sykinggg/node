import { Controller, Get, Body, Post, Req } from '@nestjs/common';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
    constructor(private readonly musicService: MusicService) {}

    /**
     * qq 音乐
     */

    // 轮播图
    @Get('qq/carousel')
    async qqCarousel(): Promise<any> {
        return await this.musicService.qqCarousel();
    }

    // 歌单列表
    @Get('qq/songList')
    async qqSongList(): Promise<any> {
        return await this.musicService.qqSongList();
    }

    // 歌单详情
    @Get('qq/songList/detail')
    async qqSongListDetail(@Req() request): Promise<any> {
        return await this.musicService.qqSongListDetail(request);
    }

    // 歌手数据
    @Get('qq/singer')
    async qqSinger(@Req() request): Promise<any> {
        return await this.musicService.qqSinger(request);
    }

    // 歌手详情
    @Get('qq/singer/detail')
    async qqSingerDetail(@Req() request): Promise<any> {
        return await this.musicService.qqSingerDetail(request);
    }

    // 排行榜
    @Get('qq/rank')
    async qqRank(@Req() request): Promise<any> {
        return await this.musicService.qqRank(request);
    }

    // 排行榜详情
    @Get('qq/rank/detail')
    async qqRankDetail(@Req() request): Promise<any> {
        return await this.musicService.qqRankDetail(request);
    }
}
