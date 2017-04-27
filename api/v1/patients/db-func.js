let personManager = require("../persons/crud");
let patientsManager = require("./crud");
let PatientSchema = require("./Patient.schema");

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

	checkNumber: function(data) {
		return new Promise((resolve, reject) => {
			let personId = data.personId ? data.personId : false;

			if(personId) {
				PatientSchema.findOne({personId: personId}, function(errors, foundObject) {
					if(errors) return Promise.reject({errors});
					else {
						if(foundObject) {
							reject({errors: "Для данного пользователя уже создана карта", item: foundObject});
						} else {
							resolve(data);
						}
					}
				});
			} else {
				resolve(data);
			}
		});
	}
}