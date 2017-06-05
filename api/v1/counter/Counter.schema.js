var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    count: Number,
    type: String,
    date: Date
});

module.exports = mongoose.model('counter', counterSchema);