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
				   	},
				   	{
				      	$unwind: "$tags"
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
				      	$unwind: "$tag_item"
				   	},
					{
						$group: { 
							_id: "$_id",
							person: { $first: "$person"},
							createdAt: { $first: "$createdAt" },
							active: { $first: "$active"},
							tags: { $addToSet: "$tags" }, 
							tag_names: { $push: "$tag_item.name"}
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
		return doctorManager
			.read(id);
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
