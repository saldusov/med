const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FileSchema = new Schema({
	filename: { type: String, required: true, unique: true, trim: true },
	originalname: { type: String, required: true, trim: true },
	path: String,
	thumbs: String,
	size: Number,
	mimetype: String,
	signature: String,
	meta: {
		title: String,
		alt: String
	}
});

module.exports = mongoose.model('files', FileSchema);