const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const habitCompletionSchema = new Schema({
    habit: { type: Schema.Types.ObjectId, ref: 'Habit', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('HabitCompletion', habitCompletionSchema);