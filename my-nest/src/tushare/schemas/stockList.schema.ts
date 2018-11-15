import * as mongoose from 'mongoose';

export const StockListSchema = new mongoose.Schema({
    data: Array,
    name: String,
});
