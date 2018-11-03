const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    familymember: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
    createdat: { type: String, default:new Date(Date.now()).toLocaleString() },
    description: {type: String}
});

module.exports = mongoose.model('todo', todoSchema);