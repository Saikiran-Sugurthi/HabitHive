const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    frequency: { type: String, enum: ['daily', 'weekly'], required: true },
    category: { type: String, trim: true, default: 'General' },
    currentStreak: { type: Number, default: 0 },
}, { timestamps: true });

habitSchema.index({ user: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Habit', habitSchema);