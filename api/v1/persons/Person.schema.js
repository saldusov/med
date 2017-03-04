var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* field type: guest, user, admin, patient, doctor */
var PersonSchema = new Schema({
	first_name: {
		type: String,
		lowercase: true
	},
	second_name: {
		type: String,
		lowercase: true
	},
	last_name: {
		type: String,
		lowercase: true
	},
	birthdate: Date,
	phone: String,
	email: {
		type: String,
		lowercase: true
	},
	gender: String,
	picture: {
		type: Schema.ObjectId,
		ref: 'files'
	}
},
{
  toObject: {
  	virtuals: true
  },
  toJSON: {
  	virtuals: true 
  }
});


module.exports = mongoose.model('persons', PersonSchema);