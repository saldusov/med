var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doctorSchema = new Schema({
	personId: {
		type: Schema.ObjectId,
		require: true
	},
	tags: {
		type: [Schema.ObjectId],
		require: true
	},
	experience: Number,
	comments: [
		{
			name: String,
			body: String,
			rating: Number
		}
	],
	certificates: [
		{
			title: String,
			imageId: Schema.ObjectId
		}
	],
	achievements: [String], // big, surg, ped, amb
	doctorate: {
		type: String, // def, top, kmn
		default: 'def'
	},
	locations: {
		type: [String], // bik, ost
		default: ['bik']
	},
	active: {
		type: Boolean,
		default: true
	}
});

module.exports = mongoose.model('doctors', doctorSchema);