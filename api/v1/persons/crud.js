const PersonSchema = require('./Person.schema');

let personManager = {
	gerOrCreate: function(id, data) {
		if(id) {
			return personManager.read(id);
		} else {
			return personManager.create(data);
		}
	},

	read: function(id) {
		return new Promise(function(resolve, reject) {
			PersonSchema
				.findOne({_id: id}, function(errors, result) {
					if(errors) {
						reject([errors]);
					} else {
						if(!result) {
							resolve(false);
						} else {
							resolve(result);
						}
					}
				});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let person = new PersonSchema(data);
			person.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить персональные данные"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			PersonSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
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
			PersonSchema.remove({ _id: id }, function(errors, result) {
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

module.exports = personManager;