import { Document } from 'mongoose';

export interface Weather extends Document {
    readonly address: any;
}
