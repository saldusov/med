const express = require("express");
let app = module.exports = express();

const mongoose = require('mongoose');
const ServiceModel = require('./Service.model');

let parseData = require("./middleware").parseData;

/* GET items list. */
app.get('/', function(req, res, next) {
	ServiceModel.find(function(err, services) {
		res.json(services);
	});
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	ServiceModel.findOne({_id: req.params.id}, function(err, foundItem) {
		res.json(foundItem);
	});
});

/* Insert item */
app.post('/', parseData, function(req, res, next){
	
	var serviceItem = req.body;
	
	var service = new ServiceModel(serviceItem);
	service.save(function(err, savedObject){
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

app.put('/:id', parseData, function(req, res, next){
	var serviceItem = req.body;

	ServiceModel.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			res.status(500).json({err});
		} else {
			if(!foundObject) {
				res.status(404).json({err});
			} else {
				ServiceModel.update({_id: foundObject._id}, {$set: serviceItem}, function(err, updatedObject){
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

app.delete('/:id', function(req, res, next) {
	ServiceModel.remove({ _id: req.params.id }, function(err, result) {
    	if (err) {
			res.status(500).json({err});
    	} else {
    		if(result.result.n > 0) {
    			res.status(200).json({status: "ok"});
    		} else {
    			res.status(404).json({errors: ["Товар не существует"]});
    		}
    	}
	});
});
