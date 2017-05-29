const mongoose = require('mongoose');
const procedurniy = require("./data/procedurniy");
const endocrinolog = require("./data/endocrinolog");
// kardiolog - экг (+процедурный)
const kardiolog = require("./data/kardiolog");
const nevrolog = require("./data/nevrolog");
const dermatovenerolog = require("./data/dermatovenerolog");
const urolog = require("./data/urolog");
const pediatr = require("./data/pediatr");
const uzi_ped = require("./data/uzi_ped");
// mammolog - маммография (+рентген)
const mammolog = require("./data/mammolog");
const uzi = require("./data/uzi");
const travmatolog = require("./data/travmatolog");
const flebolog = require("./data/flebolog");
const massag = require("./data/massag");
const revmatolog = require("./data/revmatolog");
const terapevt = require("./data/terapevt");
const infekcionist = require("./data/infekcionist");

mongoose.connect('mongodb://localhost:27017/medtest111');
const ServiceSchema = require("./api/v1/services/Service.schema");
const SpecialtySchema = require("./api/v1/specialties/Specialty.schema");

Promise.all([ServiceSchema.remove({}), SpecialtySchema.remove({})])
      	.then(() => init())
      	.then(() => console.log('cicle done!'));


function init() {
	return new Promise((resolve, reject) => {
		let specProc = new SpecialtySchema({name: "Процедурный кабинет"});
		var specValue = null;

		specProc.save((err, result) => {
			specValue = result;
			procedurniy.forEach( service => {
				service.tags = [specValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		let endocrinologProc = new SpecialtySchema({name: "Эндокринолог"});
		var endocrinologValue = null;

		endocrinologProc.save((err, result) => {
			endocrinologValue = result;
			endocrinolog.forEach( service => {
				service.tags = [endocrinologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//kardiolog
		let kardiologProc = new SpecialtySchema({name: "Кардиолог"});
		var kardiologValue = null;

		kardiologProc.save((err, result) => {
			kardiologValue = result;
			kardiolog.forEach( service => {
				service.tags = [kardiologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//nevrolog
		let nevrologProc = new SpecialtySchema({name: "Невролог"});
		var nevrologValue = null;

		nevrologProc.save((err, result) => {
			nevrologValue = result;
			nevrolog.forEach( service => {
				service.tags = [nevrologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//dermatovenerolog
		let dermatovenerologProc = new SpecialtySchema({name: "Дерматовенеролог"});
		var dermatovenerologValue = null;

		dermatovenerologProc.save((err, result) => {
			dermatovenerologValue = result;
			dermatovenerolog.forEach( service => {
				service.tags = [dermatovenerologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//urolog
		let urologProc = new SpecialtySchema({name: "Уролог"});
		var urologValue = null;

		urologProc.save((err, result) => {
			urologValue = result;
			urolog.forEach( service => {
				service.tags = [urologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//pediatr
		let pediatrProc = new SpecialtySchema({name: "Педиатр"});
		var pediatrValue = null;

		pediatrProc.save((err, result) => {
			pediatrValue = result;
			pediatr.forEach( service => {
				service.tags = [pediatrValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//uzi_ped
		let uzi_pedProc = new SpecialtySchema({name: "УЗИ детское"});
		var uzi_pedValue = null;

		uzi_pedProc.save((err, result) => {
			uzi_pedValue = result;
			uzi_ped.forEach( service => {
				service.tags = [uzi_pedValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//mammolog
		let mammologProc = new SpecialtySchema({name: "Маммолог"});
		var mammologValue = null;

		mammologProc.save((err, result) => {
			mammologValue = result;
			mammolog.forEach( service => {
				service.tags = [mammologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//uzi
		let uziProc = new SpecialtySchema({name: "УЗИ"});
		var uziValue = null;

		uziProc.save((err, result) => {
			uziValue = result;
			uzi.forEach( service => {
				service.tags = [uziValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//travmatolog
		let travmatologProc = new SpecialtySchema({name: "Травматолог"});
		var travmatologValue = null;

		travmatologProc.save((err, result) => {
			travmatologValue = result;
			travmatolog.forEach( service => {
				service.tags = [travmatologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//flebolog
		let flebologProc = new SpecialtySchema({name: "Флеболог"});
		var flebologValue = null;

		flebologProc.save((err, result) => {
			flebologValue = result;
			flebolog.forEach( service => {
				service.tags = [flebologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//massag
		let massagProc = new SpecialtySchema({name: "Массаж"});
		var massagValue = null;

		massagProc.save((err, result) => {
			massagValue = result;
			massag.forEach( service => {
				service.tags = [massagValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//revmatolog
		let revmatologProc = new SpecialtySchema({name: "Ревматолог"});
		var revmatologValue = null;

		revmatologProc.save((err, result) => {
			revmatologValue = result;
			revmatolog.forEach( service => {
				service.tags = [revmatologValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//terapevt
		let terapevtProc = new SpecialtySchema({name: "Терапевт"});
		var terapevtValue = null;

		terapevtProc.save((err, result) => {
			terapevtValue = result;
			terapevt.forEach( service => {
				service.tags = [terapevtValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		//infekcionist
		let infekcionistProc = new SpecialtySchema({name: "Инфекционист"});
		var infekcionistValue = null;

		infekcionistProc.save((err, result) => {
			infekcionistValue = result;
			infekcionist.forEach( service => {
				service.tags = [infekcionistValue._id];
				let serviceObj = new ServiceSchema(service);

				serviceObj.save();
			});
		});

		resolve();
	});
}