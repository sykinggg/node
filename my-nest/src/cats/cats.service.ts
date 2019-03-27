import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CatsService {
    constructor(@Inject('CatModelToken') private readonly catModel: Model<Cat>) { }

    async create(createCatDto: CreateCatDto): Promise<Cat> {
        const createdCat = new this.catModel(createCatDto);
        return await createdCat.save();
    }

    async findAll(): Promise<Cat[]> {
        return await this.catModel.find().exec();
    }

    async text(): Promise<any> {

        const browser = await (puppeteer.launch({ headless: false }));
        const page = await browser.newPage();
        // 进入页面
        await page.goto('https://music.163.com/#');

        console.log(page);

        return null;
    }
}
