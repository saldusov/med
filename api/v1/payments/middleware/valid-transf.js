const PersonSchema = require("../../persons/Person.schema");
const vtPerson = require("../../persons/valid-transf");

module.exports = {
	validation: function(data, errors) {
		if(!!!data._id) {
			delete data._id;
		}

		if(data.status == 'open') {
			checkErrorIsOpen(data, errors);
		}

		if(data.status == 'close') {
			checkErrorIsClose(data, errors);
		}

		if(data.status == 'collected') {
			checkErrorIsCollected(data, errors);
		}

		if(errors.length > 0) return false;
		return true;
	},

	transform: function(data) {
		vtPerson.checkCreate(data);
	}

}

function checkErrorIsOpen(data, errors) {
	if(!!!data.specialists || data.specialists.length === 0) {
		errors.push('Выберите специалиста');
	} 
}

function checkErrorIsClose(data, errors) {
	if(!!!data.services && !!!data.analyzes) {
		errors.push('Выберите услуги к оплате');
	} else {
		let services = [];
		if(!!data.services || data.services.length > 0) services = services.concat(data.services);
		if(!!data.analyzes || data.analyzes.length > 0) services = services.concat(data.analyzes);

		if(services.length === 0) {
			errors.push('Выберите услуги к оплате');
		}
	}
}

function checkErrorIsCollected(data, errors) {
	checkErrorIsOpen(data, errors);
	checkErrorIsClose(data, errors);
	if(!data.createPerson && !!!data.personId) errors.push('Выберите пациента');
}