const express = require("express");
let app = module.exports = express();

const PatientSchema = require('./Patient.schema');
let parseData = require("./middleware").parseData;
let personManager = require("../persons/crud");
let patientManager = require("./crud");
let dbFunc = require("./db-func");

const PersonSchema = require('../persons/Person.schema');

/* GET items list. */
app.get('/', function(req, res, next) {
	PatientSchema
		.aggregate([
			{
				$lookup: {
					from: "persons",
					localField: "personId",
					foreignField: "_id",
					as: "person"
				}
			},
			{
		      	$unwind: {
		      		path: "$person",
		      		preserveNullAndEmptyArrays: true
		      	}
		   	}
		])
		.exec(function (err, foundItems) {
			if(err) {
				res.status(500).json({errors: [err]});
			} else {
				res.json(foundItems);
			}
		});
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	PatientSchema.findOne({_id: req.params.id}, function(errors, foundItem) {
		res.json(foundItem);
	});
});

/* Insert item */
app.post('/', parseData, function(req, res, next){

	dbFunc.checkPerson(req.body)
		.then((data) => patientManager.create(req.body))
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));
});

app.put('/:id', parseData, function(req, res, next){

	dbFunc.checkPerson(req.body)
		.then((data) => patientManager.update(req.params.id, data))
		.then((modifyData) => patientManager.read(req.params.id))
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));

});

app.delete('/:id', function(req, res, next) {
	
	patientManager
		.delete(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Пациент не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
