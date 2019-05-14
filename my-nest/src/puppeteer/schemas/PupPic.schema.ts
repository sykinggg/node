import * as mongoose from 'mongoose';

export const PupPicSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
