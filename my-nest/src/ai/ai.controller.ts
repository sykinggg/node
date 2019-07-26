import { Controller, Post, Body } from '@nestjs/common';
import { CreateAiDataBaseDto } from './dto/create-ai.dto';
import { AiService } from './ai.service';

/**
 *
 * ai 后端计算统计
 * @export
 * @class AiController
 */
@Controller('ai')
export class AiController {
    constructor(private aiService: AiService) {}

    /**
     *
     * 创建基础数据
     * @param {CreateAiDataBaseDto} createAiDto
     * @returns
     * @memberof AiController
     */
    @Post('/dataBaseSave')
    async saveBaseData(@Body() createAiDto: CreateAiDataBaseDto) {
        return this.aiService.createBaseData(createAiDto);
    }

    /**
     *
     * 获取特定类型数据
     * @returns
     * @memberof AiController
     */
    @Post('/dataBaseObtain')
    async dataBaseObtain() {
        return this.aiService.getData('createBaseData');
    }

    /**
     *
     * 写入特定类型的数据
     * @returns
     * @memberof AiController
     */
    @Post('/dataBaseDelete')
    async dataBaseDelete() {
        return this.aiService.setData('createBaseData', []);
    }
}
