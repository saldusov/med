const express = require("express");
let app = module.exports = express();

let PersonModel = require('../persons/Person.model');
let parseData = require("./middleware").parseData;

/*const multer  = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});

let upload = multer({ storage: storage }).single("picture");*/

/* GET patiens list. */
app.get('/', function(req, res, next) {
	PersonModel.find(function(err, foundItems) {
		res.json(foundItems);
	});
});

app.get('/:id', function(req, res, next) {
	PersonModel.findOne({_id: req.params.id}, function(err, foundItem) {
		res.json(foundItem);
	});
});

app.post('/', parseData, function(req, res, next){
	
	var personItem = req.body;

	//personItem.birthdate = new Date(req.body.birthdate);
	
	var person = new PersonModel(personItem);

	person.save(function(err, savedObject){
		if (err) {
			res.status(500).send(err);
		}
		else res.status(200).json(savedObject);
	});

});

app.put('/:id', parseData, function(req, res, next){

	var serviceItem = req.body;

	PersonModel.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			res.status(500).json({err});
		} else {
			if(!foundObject) {
				res.status(404).json({err});
			} else {
				PersonModel.update({_id: foundObject._id}, {$set: serviceItem}, function(err, updatedObject){
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
	PersonModel.remove({ _id: req.params.id }, function(err, result) {
    	if (err) {
			res.status(500).json({err});
    	} else {
    		if(result.result.n > 0) {
    			res.status(200).json({status: "ok"});
    		} else {
    			res.status(404).json({errors: ["Персональная информация не существует"]});
    		}
    	}
	});
});
