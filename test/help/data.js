const path = require("path");
const PaymentSchema = require(path.resolve('api/v1/payments/Payment.schema'));
const PersonSchema = require(path.resolve('api/v1/persons/Person.schema'));
const SpecialistSchema = require(path.resolve('api/v1/doctors/Doctor.schema'));
const ServiceSchema = require(path.resolve('api/v1/services/Service.schema'));
const AnalyzesSchema = require(path.resolve('api/v1/analyzes/Analyzes.schema'));
const SpecialtySchema = require(path.resolve('api/v1/specialties/Specialty.schema'))

function clearAll() {
	let clear = [];
	clear.push(PaymentSchema.remove({}, (err) => Promise.resolve()));
  clear.push(PersonSchema.remove({}, (err) => Promise.resolve()));
  clear.push(ServiceSchema.remove({}, (err) => Promise.resolve()));
  clear.push(AnalyzesSchema.remove({}, (err) => Promise.resolve()));
  clear.push(SpecialtySchema.remove({}, (err) => Promise.resolve()));
  clear.push(SpecialistSchema.remove({}, (err) => Promise.resolve()));

  return clear;
}

function createSpecialist(params) {
	return new Promise((resolve, reject) => {
		let spec = new SpecialistSchema({
			personId: params.personId,
			tags: params.tags,
			experience: params.experience,
			comments: params.comments,
			certificates: params.certificates,
			achievements: params.achievements, // big, surg, ped, amb
			doctorate: params.doctorate,
			locations: params.locations,
			active: !!params.active
		});

		spec.save((err, saved) => resolve(saved));
	});
}

function createSpecialty(params) {
	return new Promise((resolve, reject) => {
		let specialty = new SpecialtySchema({name: params.name, active: params.active});

		specialty.save((err, saved) => resolve(saved));
	});
}

function createPerson() {
	return new Promise((resolve, reject) => {
		let person = new PersonSchema({first_name: 'Виктор', second_name: 'Викторович', last_name: 'Салдусов', birthdate: new Date('1991-04-20'), phone: '89266904832', gender: 'male', email: 'saldusov@gmail.com'});

		person.save((err, saved) => resolve(saved));
	});
	
}

function createService(params) {
	return new Promise((resolve, reject) => {
		let service = new ServiceSchema({
			title: params.title,
			description: params.description,
			recommendations: params.recommendations,
			priceVariant: params.priceVariant,
			time: params.time,
			tags: params.tags,
			active: !!params.active
		});
		service.save((err, saved) => resolve(saved));
	});
}

function createAnalyzes(params) {
	return new Promise((resolve, reject) => {
		let analyzes = new AnalyzesSchema({
			art: params.art,
			priceLabs: params.priceLabs,
			title: params.title,
			priceProd: params.priceProd,
			time: params.time,
			description: params.description,
			active: !!params.active
		});

		analyzes.save((err, saved) => resolve(saved));
	});
}


let specialties = [
	{name: 'Гинеколог', active: true},
	{name: 'Уролог', active: true},
	{name: 'Терапевт', active: true},
	{name: 'Кардиолог', active: true}
];

let services = [
	{
		title: 'Первичный прием гинеколога',
		description: 'Первичный приём',
		recommendations: 'никаких вам рекомендаций',
		priceVariant: {
			default: 1300,
			top: 1500,
			kmn: 1900
		},
		time: 60,
		tags: [],
		active: true
	},
	{
		title: 'Повторный прием гинеколога',
		description: 'Повторный приём',
		recommendations: null,
		priceVariant: {
			default: 1100,
			top: 1300,
			kmn: 1600
		},
		time: 30,
		tags: [],
		active: true
	}
];

let analyzes = [
	{
		art: {
			cmd: '100001',
			invitro: '543',
			helix: '01-001'
		},
		title: {
			cmd: 'Хрень какая-то',
			invitro: 'Хрень какая-то',
			helix: 'Хрень какая-то'
		},
		priceLabs: {
			cmd: 100,
			invitro: 200,
			helix: 90
		},
		priceProd: {
			cmd: 200,
			invitro: 400,
			helix: 180
		},
		description: 'Хрень какая-то',
		time: 60,
		active: true
	},
	{
		art: {
			cmd: '100001',
			invitro: '543',
			helix: '01-001'
		},
		title: {
			cmd: 'Тоже Хрень какая-то',
			invitro: 'Тоже Хрень какая-то',
			helix: 'Тоже Хрень какая-то'
		},
		priceLabs: {
			cmd: 100,
			invitro: 200,
			helix: 90
		},
		priceProd: {
			cmd: 200,
			invitro: 400,
			helix: 180
		},
		description: 'Тоже Хрень какая-то',
		time: 60,
		active: true
	},
];

let specs = [
	{
		personId: null,
		tags: [],
		experience: 10,
		comments: [],
		certificates: [],
		achievements: ['big', 'surg'], // big, surg, ped, amb
		doctorate: ['default'],
		locations: ['bikovo'],
		active: true
	}
];

module.exports = {
	clearAll: clearAll,
	createSpecialist: createSpecialist,
	createSpecialty: createSpecialty,
	createPerson: createPerson,
	createService: createService,
	createAnalyzes: createAnalyzes,
	specialties: specialties,
	services: services,
	services1: services,
	analyzes: analyzes,
	specialists: specs
};