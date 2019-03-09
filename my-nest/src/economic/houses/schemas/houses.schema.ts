import * as mongoose from 'mongoose';

export const HousesSchema = new mongoose.Schema({
    data: Object,
    name: String,
});
