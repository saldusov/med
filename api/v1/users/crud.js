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

	update: function(foundObject, data) {
		return new Promise(function(resolve, reject) {

			if(data.username) foundObject.username = data.username;
			if(data.password) foundObject.password = data.password;
			if(data.personId) foundObject.personId = data.personId;
			if(data.group) foundObject.group = data.group;
			if(data.active != null) foundObject.active = data.active;
			if(data.resource) foundObject.resource = data.resource;

			foundObject.save(function(errors, updatedObject){
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