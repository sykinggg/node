import { Controller, Post, Body } from '@nestjs/common';
import { CreateAiDataBaseDto } from './dto/create-ai.dto';
import { AiService } from './ai.service';

@Controller('ai')
export class AiController {
    constructor(private aiService: AiService) {}

    @Post('/dataBaseSave')
    async saveBaseData(@Body() createAiDto: CreateAiDataBaseDto) {
        return this.aiService.createBaseData(createAiDto);
    }

    @Post('/dataBaseObtain')
    async dataBaseObtain() {
        return this.aiService.getData('createBaseData');
    }

    @Post('/dataBaseDelete')
    async dataBaseDelete() {
        return this.aiService.setData('createBaseData', []);
    }
}
