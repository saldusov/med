const mongoose = require('mongoose');
const GoodSchema = require('../Good.schema');

let goodManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			GoodSchema.findOne({_id: id}, function(errors, foundItem) {
				if(errors) {
					reject([errors]);
				} else {
					if(!foundItem) {
						reject(["Товар не найдена"]);
					} else {
						resolve(foundItem);
					}
				}
			});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let good = new GoodSchema(data);

			good.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось добавить товар"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			GoodSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
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
			GoodSchema.remove({ _id: id }, function(errors, result) {
		    	if (errors) {
					reject([errors]);
		    	} else {
		    		if(result.result.n > 0) {
		    			resolve({status: "ok"});
		    		} else {
		    			reject(["Товар не существует"]);
		    		}
		    	}
			});
		});
	}
};

module.exports = goodManager;