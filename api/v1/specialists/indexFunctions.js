const SpecialistSchema = require('./Specialist.schema');
let personManager = require("../persons/crud");
let specialistsManager = require("./crud");
let dbFunc = require("./db-func");

const PersonSchema = require('../persons/Person.schema');

module.exports =  {
	get: function() {
		return new Promise((resolve, reject) => {
			SpecialistSchema
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
							doctorate: { $first: "$doctorate"},
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
		return specialistsManager
			.read(id);
	},

	add: function(data) {
		return dbFunc.checkPerson(data)
			.then((data) => specialistsManager.create(data));
	},

	update: function(id, data) {
		return dbFunc.checkPerson(data)
			.then((data) => specialistsManager.update(id, data))
			.then((modifyData) => specialistsManager.read(id));
	},

	deleteOne: function(id) {
		return specialistsManager
			.delete(id);
	}
}
