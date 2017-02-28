var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UsedModel = require('./Image.model');

/* GET items list. */
router.get('/', function(req, res, next) {
	UsedModel
		.find()
		.exec(function(err, foundObjects) {
			res.json(foundObjects);
		});
});

/* GET one item. */
router.get('/:id', function(req, res, next) {
	UsedModel
		.findOne({_id: req.params.id})
		.exec(function(err, foundItem) {
			res.json(foundItem);
		});
});

/* Insert item */
router.post('/', function(req, res, next){
	
	var addItem = req.body;
	
	var user = new UsedModel(addItem);
	user.save(function(err, savedObject){
		if (err) {
			throw new Error("500|Error user save!");
		} else {
			if(!savedObject) {
				res.status(404).send();
			} else {
				res.json(savedObject);
			}
		}
	});

});

router.put('/:id', function(req, res, next){
	var updateItem = req.body;
	UsedModel.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			throw new Error("500|Error user update!");
		} else {
			if(!foundObject) {
				throw new Error("404|User not found - update request!");
			} else {
				if(updateItem.email) foundObject.email = updateItem.email;
				if(updateItem.username) foundObject.username = updateItem.username;
				if(updateItem.password) foundObject.password = updateItem.password;
				if(updateItem.group) foundObject.group = updateItem.group;
				if(updateItem.resource) foundObject.resource = updateItem.resource;
				if(updateItem.info) foundObject.info = updateItem.info;
				if(typeof updateItem.active == 'boolean') foundObject.active = updateItem.active; 
				
				foundObject.save(function(err, updatedObject){
					if(err) {
						console.log(err);
						res.status(500).send();
					} else {
						res.status(200).json({_id: updatedObject._id});
					}
				});
			}
		}
	});
});

router.delete('/:id', function(req, res, next) {
	UsedModel.remove({ _id: req.params.id }, function(err) {
    	if (err) {
    		console.log(err);
			res.status(500).send();
    	}
    	res.status(200).send();
	});
});

module.exports = router;
