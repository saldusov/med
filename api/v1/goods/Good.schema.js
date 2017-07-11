var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var goodsSchema = new Schema({
	title: String,
	description: String,
	price: Number,
	tags: [Schema.ObjectId],
	score: {
		type: Number,
		default: 0
	},
	code: Number,
	active: Boolean
});

module.exports = mongoose.model('goods', goodsSchema);