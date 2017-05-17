const mongoose = require("mongoose");
const UserSchema = require('./User.schema');

let userManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			UserSchema
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
							$lookup: {
								from: "files",
								localField: "person.picture",
								foreignField: "_id",
								as: "person.picture"
							}
						},
						{
							$unwind: {
								path: "$person.picture",
								preserveNullAndEmptyArrays: true
							}
						},
						{
							$project: {
								username: 1,
								updatedAt: 1,
								createdAt: 1,
								personId: 1,
								person: 1,
								group: 1,
								active: 1,
								resource: 1
							}
						}
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
			let user = new UserSchema(data);
			user.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить данные пользователя"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			let updateData = {};
			if(data.username) updateData.username = data.username;
			if(data.password) updateData.password = data.password;
			if(data.personId) updateData.personId = data.personId;
			if(data.group) updateData.group = data.group;
			if(data.active != null) updateData.active = data.active;
			if(data.resource) updateData.resource = data.resource;
			console.log(updateData);
			UserSchema.update({_id: id}, {$set: updateData}, function(errors, updatedObject){
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
			UserSchema.remove({ _id: id }, function(errors, result) {
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

module.exports = userManager;