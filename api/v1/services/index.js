const express = require("express");
let app = module.exports = express();

const mongoose = require('mongoose');
const ServiceSchema = require('./Service.schema');

let middleware = require("./middleware");

/* GET items list. */
app.get('/', middleware.parseQuery, function(req, res, next) {
	let pipeline = [
		{
	      	$unwind: {
	      		path: "$tags",
	      		preserveNullAndEmptyArrays: true
	      	}
	   	},
		{
			$lookup: {
				from: "specialties",
				localField: "tags",
				foreignField: "_id",
				as: "tag_item"
			}
		},
		{
	      	$unwind: {
	      		path: "$tag_item",
	      		preserveNullAndEmptyArrays: true
	      	}
	   	},
		{
			$group: { 
				_id: "$_id",
				title: { $first: "$title" },
				description: { $first: "$description" },
				recommendations: { $first: "$recommendations" },
				priceVariant: { $first: "$priceVariant" },
				time: { $first: "$time" },
				active: { $first: "$active" }, 
				tags: { $addToSet: "$tags" }, 
				tag_names: { $push: "$tag_item.name"}
			}
		}
	];

	if(req.mongoParams.match) pipeline.unshift(req.mongoParams.match);
	if(req.mongoParams.addFields) pipeline.push(req.mongoParams.addFields);

	ServiceSchema
		.aggregate(pipeline)
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
	ServiceSchema.findOne({_id: req.params.id}, function(err, foundItem) {
		res.json(foundItem);
	});
});

/* Insert item */
app.post('/', middleware.parseData, function(req, res, next){
	
	var serviceItem = req.body;
	
	var service = new ServiceSchema(serviceItem);
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

app.put('/:id', middleware.parseData, function(req, res, next){
	var serviceItem = req.body;

	ServiceSchema.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			res.status(500).json({err});
		} else {
			if(!foundObject) {
				res.status(404).json({err});
			} else {
				ServiceSchema.update({_id: foundObject._id}, {$set: serviceItem}, function(err, updatedObject){
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
	ServiceSchema.remove({ _id: req.params.id }, function(err, result) {
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
