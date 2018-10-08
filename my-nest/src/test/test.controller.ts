import { Controller, Get, Req } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
    constructor(private testService: TestService) {

    }
    @Get()
    findAll(@Req() request) {
        return this.testService.root(request);
    }
}
