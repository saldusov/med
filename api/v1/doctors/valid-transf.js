const PersonSchema = require("../persons/Person.model");
const vtPerson = require("../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(!data.tags) errors.push("Укажите специальность!");

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		vtPerson.checkCreate(data);
	}

}