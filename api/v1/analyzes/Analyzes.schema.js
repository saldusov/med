var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var analyzesSchema = new Schema({
	art: {
		cmd: String,
		helix: String,
		invitro: String
	},
	price: {
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
	description: [String],
	active: Boolean
});

module.exports = mongoose.model('analyses', analyzesSchema);