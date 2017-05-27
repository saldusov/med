const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require("crypto");

const SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true },
	passwordHash: { type: String, required: true, trim: true },
  	salt: { type: String, required: true, trim: true },
	resource: [
		{id: String, permissions: [String]}
	],
	group: String, /* admin, user-admin, user-spec, user-buh, boss, user, develop */
	active: { type: Boolean, default: true },
	personId: Schema.ObjectId
},
{
    timestamps: true
});

UserSchema
	.virtual('password')
	.set(function (password) {
	  this._plainPassword = password;
	  if (password) {
	    this.salt = crypto.randomBytes(128).toString('base64');
	    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
	  } else {
	    this.salt = undefined;
	    this.passwordHash = undefined;
	  }
	})
	.get(function () {
	  return this._plainPassword;
	});

UserSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  console.log('Pre success', crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash);
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

module.exports = mongoose.model('users', UserSchema);