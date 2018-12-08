import * as mongoose from 'mongoose';

export const WeatherSchema = new mongoose.Schema({
    address: Array,
    name: String,
});
