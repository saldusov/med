const express = require("express");
let app = module.exports = express();

const UserModel = require('./User.model');

/* GET items list. */
app.get('/', function(req, res, next) {
	UserModel
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
		.exec(function(err, foundObjects) {
			res.json(foundObjects);
		});
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	/*UserModel.findOne({_id: req.params.id}, {password: 0}).populate('info').exec(function(err, foundItem) {
		if(foundItem.info) {
			FileModel.findOne({_id: foundItem.info.image}, {_id: 1, filename: 1}).exec(function(err, foundImage){
				if(err) {
					res.json(foundItem);
				} else {
					foundItem.info.image = foundImage;
					res.json(foundItem);
				}
			});
		} else {
			res.json(foundItem);
		}
	});*/
});

/* Insert item */
app.post('/', function(req, res, next){

	upload(req, res, function (err) {
		console.log("i am here!");
		if (err) {
			console.log(err);
		  // An error occurred when uploading
		  return
		}

		let addItem = req.body;	
		// Everything went fine
		console.log(addItem);
	});


	next();
	/*var user = new UserModel(addItem);
	user.save(function(err, savedObject){
		if (err) {
			console.log(err);
			throw new Error("500|Error user save!");
		} else {
			if(!savedObject) {
				res.status(404).send();
			} else {
				res.json(savedObject);
			}
		}
	});*/

});

app.put('/:id', function(req, res, next){
	var updateItem = req.body;
	UserModel.findOne({_id: req.params.id}, function(err, foundObject){
		if(err) {
			res.status(500).json({err});
		} else {
			if(!foundObject) {
				res.status(404).json({err});
			} else {
				UserModel.update({_id: foundObject._id}, {$set: updateItem}, function(err, updatedObject){
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
	UserModel.remove({ _id: req.params.id }, function(err, result) {
    	if (err) {
			res.status(500).json({err});
    	} else {
    		if(result.result.n > 0) {
    			res.status(200).json({status: "ok"});
    		} else {
    			res.status(404).json({errors: ["пользователь не существует"]});
    		}
    	}
	});
});
