const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();

const PatientSchema = require('./Patient.schema');
let middleware = require("./middleware");
let personManager = require("../persons/crud");
let patientManager = require("./crud");
let dbFunc = require("./db-func");

const PersonSchema = require('../persons/Person.schema');

/* GET items list. */
app.get('/', auth.checkAccess("patients"), middleware.parseQuery, middleware.parseQueryPerson, function(req, res, next) {
	let pageNumber = req.mongoParams.pageNumber > 0 ? ((req.mongoParams.pageNumber-1)*req.mongoParams.nPerPage) : 0;
	let nPerPage = req.mongoParams.nPerPage;

	let cursor = PatientSchema
		.aggregate([
			{
				$match: req.mongoParams.query
			},
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
		   	},
		   	{
				$match: req.mongoParams.person.query
			}
		]) 
		.cursor({batchSize: 1000})
        .exec();

        if(pageNumber > -1 && nPerPage) {
			cursor.skip(pageNumber).limit(nPerPage);
		}

		cursor.toArray(function (err, items) {
			if(err) throw new Error(err);

			res.json({items});
		});
		
});

/* GET one item. */
app.get('/:id', auth.checkAccess("patients"), function(req, res, next) {
	PatientSchema.findOne({_id: req.params.id}, function(errors, foundItem) {
		res.json(foundItem);
	});
});

/* Insert item */
app.post('/', auth.checkAccess("patients.add"), middleware.parseData, function(req, res, next){

	dbFunc.checkNumber(req.body)
		.then((data) => dbFunc.checkPerson(req.body))
		.then((data) => patientManager.create(req.body))
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json(errors));
});

app.put('/:id', auth.checkAccess("patients.update"), middleware.parseData, function(req, res, next){

	dbFunc.checkPerson(req.body)
		.then((data) => patientManager.update(req.params.id, data))
		.then((modifyData) => patientManager.read(req.params.id))
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));

});

app.delete('/:id', auth.checkAccess("patients.delete"), function(req, res, next) {
	
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
