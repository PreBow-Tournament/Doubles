import mongoose from 'mongoose';

export const pointsSchema = mongoose.model('points', new mongoose.Schema({
    key: String,
    value: Map
}));
