import { Document } from 'mongoose';

export interface Houses extends Document {
    readonly data: any;
}
