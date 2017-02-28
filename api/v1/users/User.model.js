const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");

const SALT_WORK_FACTOR = "kldjsald231dfsfJFH342hFDJSDfjksdhf111";

let UserSchema = new Schema({
	username: { type: String, required: true, unique: true, trim: true },
	password: { type: String, required: true, trim: true },
	resource: [
		{id: String, permissions: [String]}
	],
	group: String, /* admin, user-admin, user-doctor, user-buh, boss, user */
	active: { type: Boolean, default: true },
	personId: Schema.ObjectId
},
{
    timestamps: true
});

UserSchema.pre('save', function(next) {
    let user = this;
	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();
   // generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
	    if (err) return next(err);
	    // hash the password using our new salt
	    bcrypt.hash(user.password, salt, null, function(err, hash) {
	        if (err) return next(err);
	        // override the cleartext password with the hashed one
	        user.password = hash;
	        next();
	    });
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('users', UserSchema);