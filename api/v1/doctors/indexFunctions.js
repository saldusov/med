const DoctorSchema = require('./Doctor.schema');
let personManager = require("../persons/crud");
let doctorManager = require("./crud");
let dbFunc = require("./db-func");

const PersonSchema = require('../persons/Person.schema');

module.exports =  {
	get: function() {
		return new Promise((resolve, reject) => {
			DoctorSchema
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
						reject(err);
					} else {
						resolve(foundItems);
					}
				});
		});
	},

	getOne: function(id) {
		return new Promise((resolve, reject) => {
			console.log('I am here!');
			DoctorSchema.findOne({_id: id}, function(errors, foundItem) {
			console.log('But not here!');
				if(errors) {
					reject(errors);
				} else {
					resolve(foundItem);
				}
			});
		});
	},

	add: function(data) {
		return dbFunc.checkPerson(data)
			.then((data) => doctorManager.create(data));
	},

	update: function(id, data) {
		return dbFunc.checkPerson(data)
			.then((data) => doctorManager.update(id, data))
			.then((modifyData) => doctorManager.read(id));
	},

	deleteOne: function(id) {
		return doctorManager
			.delete(id);
	}
}
