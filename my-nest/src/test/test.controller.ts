import { Controller, Get, Req, Put, Delete, Post, Options, Patch, Head, All } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) { }

    @Get()
    get(@Req() request) {
        return this.testService.get(request);
    }

    @Put()
    put(@Req() request) {
        return this.testService.put(request);
    }

    @Delete()
    delete(@Req() request) {
        return this.testService.delete(request);
    }

    @Post()
    post(@Req() request) {
        return this.testService.post(request);
    }

    @Options()
    options(@Req() request) {
        return this.testService.options(request);
    }

    @Patch()
    patch(@Req() request) {
        return this.testService.patch(request);
    }

    // 只请求页面的首部
    @Head()
    head(@Req() request) {
        return this.testService.head(request);
    }

    @All()
    all(@Req() request) {
        return this.testService.all(request);
    }
}
