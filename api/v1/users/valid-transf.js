const PersonSchema = require("../persons/Person.schema");
const vtPerson = require("../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(typeof data._id != "undefined" && data._id == null) delete data._id;
		if(!data.username) errors.push("Укажите логин!");

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		
	}

}