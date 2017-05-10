const path = require("path");
const UserSchema = require(path.resolve('api/v1/users/User.schema'));

function createDefaultForm(person) {
	let form = {
		personId: person ? person.id : null,
		username: 'admin',
		password: 'admin',
		active: true
	}

	return form;
}

function createUser(person) {
	return new Promise((resolve, reject) => {
		let object = new UserSchema({
			username: 'admin',
			password: 'admin'
		});
		object.save((err, user) => resolve(user));
	});
}

function clearAll() {
	return new Promise((resolve, reject) => {
		UserSchema.remove({}, function(err) { resolve() });
	});
}


module.exports = {
	createDefaultForm: createDefaultForm,
	createUser: createUser,
	clearAll: clearAll
};