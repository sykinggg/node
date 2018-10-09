import { Module } from '@nestjs/common';
import { DataBase } from './data-base';

@Module({
    providers: [...DataBase],
    exports: [...DataBase],
})
export class DatabaseModule {}