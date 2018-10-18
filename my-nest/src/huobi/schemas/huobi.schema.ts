import * as mongoose from 'mongoose';

export const HoubiSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
