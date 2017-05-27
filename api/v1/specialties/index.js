const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();

const mongoose = require('mongoose');
const SpecialtySchema = require('./Specialty.schema');

let parseData = require("./middleware").parseData;

/* GET items list. */
app.get('/', function(req, res, next) {
	SpecialtySchema.find(function(err, specialties) {
		res.json(specialties);
	});
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	SpecialtySchema.findOne({_id: req.params.id}, function(err, foundItem) {
		res.json(foundItem);
	});
});

/* Insert item */
app.post('/', auth.checkAccess("specialties.add"), parseData, function(req, res, next){
	
	var specialtyItem = req.body;
	
	var specialty = new SpecialtySchema(specialtyItem);
	specialty.save(function(err, savedObject){
		if (err) {
			res.status(500).json({err});
		} else {
			if(!savedObject) {
				res.status(404).json({err});
			} else {
				res.status(200).json(savedObject);
			}
		}
	});

});

app.put('/:id', auth.checkAccess("specialties.update"), parseData, function(req, res, next){
	var specialtyItem = req.body;

	SpecialtySchema.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			res.status(500).json({err});
		} else {
			if(!foundObject) {
				res.status(404).json({err});
			} else {
				SpecialtySchema.update({_id: foundObject._id}, {$set: specialtyItem}, function(err, updatedObject){
					if(err) {
						res.status(500).json({err});
					} else {
						res.status(200).json(updatedObject);
					}
				});
			}
		}
	});
});

app.delete('/:id', auth.checkAccess("specialties.delete"), function(req, res, next) {
	SpecialtySchema.remove({ _id: req.params.id }, function(err, result) {
    	if (err) {
			res.status(500).json({err});
    	} else {
    		if(result.result.n > 0) {
    			res.status(200).json({status: "ok"});
    		} else {
    			res.status(404).json({errors: ["Специальность не существует"]});
    		}
    	}
	});
});
