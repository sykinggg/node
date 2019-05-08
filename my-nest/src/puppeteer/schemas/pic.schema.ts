import * as mongoose from 'mongoose';

export const PicSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
