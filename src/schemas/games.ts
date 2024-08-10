import mongoose from 'mongoose';

export const gamesSchema = mongoose.model('games', new mongoose.Schema({
    id: String,
    players: [[String, String], [String, String]],
    status: String,
    map: String,
    time: String,
    results: [
        {
            winner: Boolean,
            players: [String, String],
            colour: String,
            score: Number,
            damage: Number,
        },
        {
            winner: Boolean,
            players: [String, String],
            colour: String,
            score: Number,
            damage: Number
        }
    ]
}));