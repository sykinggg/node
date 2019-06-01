import { Document } from 'mongoose';

export interface AiDataBase extends Document {
    readonly correct: number;
    readonly error: number;
}
