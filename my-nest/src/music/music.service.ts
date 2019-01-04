import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class MusicService {
    constructor(@Inject('MusicModelToken') private readonly MusicModel: Model<any>) { }

    async text(): Promise<any> {
        return 'text';
    }
}
