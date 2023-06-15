const mongoose = require('mongoose')

const languageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Language', languageSchema)