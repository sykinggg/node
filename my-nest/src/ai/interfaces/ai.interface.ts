import { Document } from 'mongoose';

/**
 *
 * al 数据结构定义
 * @export
 * @interface AiDataBase
 * @extends {Document}
 */
export interface AiDataBase extends Document {
    readonly correct: number;
    readonly error: number;
}
