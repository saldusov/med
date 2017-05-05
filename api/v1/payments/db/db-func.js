let personManager = require("../../persons/crud");
let doctorManager = require("./crud");

module.exports = {
	checkPerson: function(data) {
		let personId = data.personId ? data.personId : false;

		if(data.createPerson) {
			return personManager
				.gerOrCreate(personId, data.person)
				.then((person) => {
					console.log(person);
					if(!person) {
						res.status(404).json({errors: ["Персональная информация не найдена"]});
					}
					else {
						console.log('I am here!');
						data.personId = person._id;
						return Promise.resolve(data);
					}
				});
		} else {
			return Promise.resolve(data);
		}
	},


}