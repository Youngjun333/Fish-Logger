const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required: true
    },
    caughtDate: {
        type: Date,
        required: true,
    },
    length: {
        type: Number,
    },
    waterTemp: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    lineColor: {
        type: String,
        required: true
    },
    sinkerWeight: {
        type: Number,
        required: true
    },
    tide: {
        type: Number,
    },
    rig: {
        type: String,
        required: true
    },
    bait: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Fish', fishSchema);