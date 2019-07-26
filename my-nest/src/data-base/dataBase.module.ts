import { Module } from '@nestjs/common';
import { DataBase } from './data-base';

/**
 *
 * 默认数据类型以及数据库定义
 * @export
 * @class DatabaseModule
 */
@Module({
    providers: [...DataBase],
    exports: [...DataBase],
})
export class DatabaseModule {}