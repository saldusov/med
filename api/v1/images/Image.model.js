const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ImageSchema = new Schema({
	filename: { type: String, required: true, unique: true, trim: true },
	originalname: { type: String, required: true, trim: true },
	path: String
});

module.exports = mongoose.model('images', UserSchema);