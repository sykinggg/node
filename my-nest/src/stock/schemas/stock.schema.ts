import * as mongoose from 'mongoose';

export const StockSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
