const PersonSchema = require("../persons/Person.schema");
const vtPerson = require("../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(data._id && data._id == null) delete data._id;
		if(!data.amb_number) errors.push("Укажите номер амбулаторной карты");

		if(data.passport) {
			if(!data.passport.type) delete data.passport.type;
			if(!data.passport.series) delete data.passport.series;
			if(!data.passport.number) delete data.passport.number;
			if(!data.passport.issued) delete data.passport.issued;
			if(!data.passport.issued_date) delete data.passport.issued_date;

			if(Object.keys(data.passport).length == 0) delete data.passport;
		}
		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		vtPerson.checkCreate(data);
	}

}