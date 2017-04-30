var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var analyzesSchema = new Schema({
	art: {
		cmd: String,
		helix: String,
		invitro: String
	},
	priceLabs: {
		cmd: Number,
		helix: Number,
		invitro: String
	},
	title: {
		cmd: String,
		helix: String,
		invitro: String
	},
	time: {
		cmd: String,
		helix: String,
		invitro: String
	},
	priceProd: {
		cmd: Number,
		helix: Number,
		invitro: Number
	},
	description: [String],
	active: Boolean
});

module.exports = mongoose.model('analyzes', analyzesSchema);