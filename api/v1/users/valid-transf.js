const PersonSchema = require("../persons/Person.schema");
const vtPerson = require("../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(!data.username) errors.push("Укажите логин!");

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		vtPerson.checkCreate(data);
	}

}