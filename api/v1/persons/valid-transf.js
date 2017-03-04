const PersonSchema = require("./Person.schema");

module.exports = {
	validation: function(data, errors) {
		if(!data.last_name) errors.push("Укажите фамилию!");
		if(!data.first_name) errors.push("Укажите имя!");

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		if(data.second_name) data.second_name = data.second_name.toLowerCase();
		if(data.email) data.email = data.email.toLowerCase();
		if(data.birthdate) data.birthdate = new Date(data.birthdate);

		data.first_name = data.first_name.toLowerCase();
		data.last_name = data.last_name.toLowerCase();
	},

	checkCreate: function(data) {
		data.createPerson = false;

		let persProps = Object.keys(PersonSchema.schema.paths);

		let find = Object.keys(data).find(function(objectKey, index) {
		    if(persProps.indexOf(objectKey) > 0) return true;
		});

		if(find) data.createPerson = true;
	}

}