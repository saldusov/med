var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var specialtySchema = new Schema({
	name: {
		type: String,
		require: true
	},
	active: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('specialties', specialtySchema);