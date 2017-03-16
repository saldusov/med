const PersonSchema = require("../persons/Person.schema");
const vtPerson = require("../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(data._id && data._id == null) delete data._id;
		if(!data.tags) errors.push("Укажите специальность!");

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		vtPerson.checkCreate(data);
	}

}