import { Document } from 'mongoose';

/**
 *
 * PupPic 数据结构
 * @export
 * @interface PupPic
 * @extends {Document}
 */
export interface PupPic extends Document {
    readonly address: any;
}
