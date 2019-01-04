import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
