import { Controller, Get, Delete, Req, UseInterceptors, FileInterceptor, UploadedFile, Post, Body } from '@nestjs/common';
import { Pic } from './interfaces/pic.interface';
import { PicService } from './pic.service';

@Controller('pic')
export class PicController {
    constructor(private readonly picService: PicService) {}

    @Get('picSet')
    async picSet(@Req() request): Promise<any> {
        console.log(request.query);
        return await this.picService.getUrl(request.query.type, 3);
    }

    @Get('dataFind')
    async find5All(@Req() request): Promise<any> {
        return await this.picService.findType(request.query.type);
    }

    @Delete('all')
    async deleteAll(): Promise<any> {
        return await this.picService.deleteAll();
    }

    @Delete('one')
    async deleteOne(@Req() request): Promise<any> {
        return await this.picService.deleteOne(request.query.type);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    UploadedFile(@UploadedFile() file, @Body() body) {
        console.log(file);
        return this.picService.uploadedFile(file);
    }
}
