var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
	title: String,
	description: String,
	recommendations: String,
	priceVariant: {
		default: Number,
		top: Number,
		kmn: Number
	},
	time: Number,
	tags: [Schema.ObjectId],
	multiple: Boolean,
	score: {
		type: Number,
		default: 0
	},
	code: Number,
	codeOsm: Number,
	active: Boolean
});

module.exports = mongoose.model('service', serviceSchema);