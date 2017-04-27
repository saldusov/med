const mongoose = require('mongoose');
const DoctorSchema = require('./Doctor.schema');

let doctorManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			DoctorSchema
				.aggregate([
					{
						$match: { _id: mongoose.Types.ObjectId(id) } 
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
				      	$unwind: "$certificates"
				   	},
					{
						$lookup: {
							from: "files",
							localField: "certificates._id",
							foreignField: "_id",
							as: "certImage"
						}
					},
					{
						$addFields: {
							"certImage.title" : "$certificates.title"
						}
					},
					{
				      	$unwind: "$certImage"
				   	},
				   	{
						$group: { 
							_id: "$_id",
							person: { $first: "$person"},
							personId: { $first: "$personId"},
							experience: { $first: "$experience" },
							certificates: { $addToSet: "$certImage"},
							achievements: { $first: "$achievements"},
							doctorate: { $first: "$doctorate"},
							locations: { $first: "$locations"},
							createdAt: { $first: "$createdAt"},
							active: { $first: "$active"},
							tags: { $first: "$tags"}
						}
					}
						/*{
							$match: { _id: mongoose.Types.ObjectId(id) } 
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
					      	$unwind: {
					      		path: "$certificates",
					      		preserveNullAndEmptyArrays: true
					      	}
				   		},
				   		{
							$lookup: {
								from: "files",
								localField: "certificates",
								foreignField: "_id",
								as: "certificates"
							}
						},
						{
							$unwind: {
								path: "$certificates",
								preserveNullAndEmptyArrays: true
							}
						},
						{
							$group: { 
								_id: "$_id",
								person: { $first: "$person"},
								personId: { $first: "$personId"},
								experience: { $first: "$experience" },
								certificates: { $addToSet: "$certificates"},
								achievements: { $first: "$achievements"},
								doctorate: { $first: "$doctorate"},
								locations: { $first: "$locations"},
								createdAt: { $first: "$createdAt"},
								active: { $first: "$active"},
								tags: { $first: "$tags"}
							}
						}*/
				])
				.exec(function(errors, foundObject) {
					if(errors) {
						reject([errors]);
					} else {
						if(!foundObject) {
							resolve(false);
						} else {
							resolve(foundObject[0]);
						}
					}
				});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let doctor = new DoctorSchema(data);

			doctor.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить данные врача"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			DoctorSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
				if(errors) {
					reject([errors]);
				} else {
					resolve(updatedObject);
				}
			});
		});
	},

	delete: function(id) {
		return new Promise(function(resolve, reject) {
			DoctorSchema.remove({ _id: id }, function(errors, result) {
		    	if (errors) {
					reject([errors]);
		    	} else {
		    		if(result.result.n > 0) {
		    			resolve({status: "ok"});
		    		} else {
		    			resolve(false);
		    		}
		    	}
			});
		});
	}
};

module.exports = doctorManager;