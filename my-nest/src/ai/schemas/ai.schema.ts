import * as mongoose from 'mongoose';

export const AiDataBaseSchema = new mongoose.Schema({
    data: Array,
    name: String,
});
