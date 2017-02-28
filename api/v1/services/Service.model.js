var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = new Schema({
	title: String,
	description: String,
	recommendations: String,
	price: {
		default: Number,
		top: Number,
		kmn: Number
	},
	time: Number,
	tags: [String],
	active: Boolean
});

module.exports = mongoose.model('service', serviceSchema);