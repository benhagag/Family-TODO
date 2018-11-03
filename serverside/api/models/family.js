const mongoose = require('mongoose');

const familySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    nickname: { type: String, required: false },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Family', familySchema);