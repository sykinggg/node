import { Document } from 'mongoose';

export interface Pic extends Document {
    readonly address: any;
}
