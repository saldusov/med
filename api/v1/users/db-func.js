let personManager = require("../persons/crud");
let userManager = require("./crud");

module.exports = {
	checkPerson: function(data, user) {
		let personId = data.personId ? data.personId : false; 
		console.log(personId);
		if(data.createPerson) {
			return personManager
				.gerOrCreate(personId, data)
				.then((person) => {
					console.log(person);
					if(!person) {
						res.status(404).json({errors: ["Пользователь не найден"]});
					}
					else {
						return userManager.update(user._id, {personId: person._id})
								.then((modifyData) => userManager.read(user._id));
					}
				});
		} else {
			return Promise.resolve(user);
		}
	},

	checkPerson2: function(data) {
		let personId = data.personId ? data.personId : false;

		if(data.createPerson) {
			return personManager
				.gerOrCreate(personId, data)
				.then((person) => {
					if(!person) {
						res.status(404).json({errors: ["Пользователь не найден"]});
					}
					else {
						data.personId = person._id;
						return Promise.resolve(data);
					}
				});
		} else {
			return Promise.resolve(data);
		}
	}

}