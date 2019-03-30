import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('cats')
export class CatsController {
    constructor(private readonly catsService: CatsService) {}

    @Post()
    async create(@Body() createCatDto: CreateCatDto) {
        console.log(createCatDto);
        this.catsService.create(createCatDto);
    }

    @Get()
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll();
    }

    @Get('/text')
    async text(): Promise<any> {
        return this.catsService.text();
    }

    @Get('/ismDoSomething')
    async ismDoSomething(): Promise<any> {
        return this.catsService.ismDoSomething();
    }
}
