import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateAiDataBaseDto } from './dto/create-ai.dto';

@Injectable()
export class AiService {

    constructor(
        @Inject('AiDataBaseModelToken') private readonly AiDataBaseModel: Model<any>,
    ) { }

    async createBaseData(data: CreateAiDataBaseDto): Promise<any> {
        // console.log(data);
        let oldArr = await this.getData('createBaseData');
        console.log('oldArr', oldArr);
        if (!oldArr || !Array.isArray(oldArr)) {
            oldArr = [];
        }
        data.dateTime = new Date().getTime();
        oldArr.push(data);
        // console.log(oldArr);
        this.setData('createBaseData', oldArr);
        return oldArr;
    }

    // 写入数据
    public setData(type, data?): void {
        console.log('写入数据', type, data);
        const oldModal = this.AiDataBaseModel.find({ name: type }).exec();
        oldModal.then(res => {
            if (res && res.length) {
                // updateOne，updateMany，bulkWrite
                this.AiDataBaseModel.updateOne({ name: type }, {data}, {}, (err, raw) => {
                    console.log(err);
                    console.log(raw);
                });
            } else {
                console.log('create', data, type);
                const createAiDataBase = new this.AiDataBaseModel({ data, name: type });
                createAiDataBase.save();
            }
            this.AiDataBaseModel.find({ name: type }).exec().then((redata: any) => {
                // console.log(redata);
            });
        });
    }

    // 获取数据
    public getData(type): any {
        const oldModal = this.AiDataBaseModel.find({ name: type }).exec();
        return oldModal.then(res => {
            if (res && Array.isArray(res) && res[0] && res[0].data) {
                return res[0].data;
            }
            return null;
        });
    }
}
