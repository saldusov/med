const path = require("path");
const SpecialistSchema = require(path.resolve('api/v1/doctors/Doctor.schema'));

function createDefaultForm(params) {
	let form = {
		personId: params.personId,
		tags: params.tags,
		experience: params.experience,
		comments: params.comments,
		certificates: params.certificates,
		achievements: params.achievements,
		doctorate: params.doctorate,
		locations: params.locations,
		active: params.active
	}

	return form;
}

function createSpecialist(person, specialties, achievements, doctorate, locations, status) {
	return new Promise((resolve, reject) => {
		let object = new SpecialistSchema({
			personId: person.id,
            tags: specialties,
            experience: 10,
            comments: [],
            certificates: [],
            achievements: achievements,
            doctorate: doctorate,
            locations: locations,
            active: status
		});
		object.save((err, specialist) => resolve(specialist));
	});
}


module.exports = {
	createDefaultForm: createDefaultForm,
	createSpecialist: createSpecialist
};