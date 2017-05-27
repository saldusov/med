let personManager = require("../persons/crud");
let specialistsManager = require("./crud");

module.exports = {
	checkPerson: function(data) {
		let personId = data.personId ? data.personId : false;

		if(data.createPerson) {
			return personManager
				.gerOrCreate(personId, data.person)
				.then((person) => {
					if(!person) {
						res.status(404).json({errors: ["Персональная информация не найдена"]});
					}
					else {
						data.personId = person._id;
						return Promise.resolve(data);
					}
				});
		} else {
			return Promise.resolve(data);
		}
	},


}