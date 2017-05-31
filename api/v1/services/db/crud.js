const mongoose = require('mongoose');
const ServiceSchema = require('../Service.schema');

let ServiceManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			ServiceSchema.findOne({_id: id}, function(errors, foundItem) {
				if(errors) {
					reject([errors]);
				} else {
					if(!foundItem) {
						reject(["Услуга не найдена"]);
					} else {
						resolve(foundItem);
					}
				}
			});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let service = new ServiceSchema(data);

			service.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось добавить услугу"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			ServiceSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
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
			ServiceSchema.remove({ _id: id }, function(errors, result) {
		    	if (errors) {
					reject([errors]);
		    	} else {
		    		if(result.result.n > 0) {
		    			resolve({status: "ok"});
		    		} else {
		    			reject(["Услуга не существует"]);
		    		}
		    	}
			});
		});
	}
};

module.exports = ServiceManager;