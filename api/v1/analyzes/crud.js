const mongoose = require("mongoose");
const AnalyzesSchema = require("./Analyzes.schema");

let analyzesManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			AnalyzesSchema
				.aggregate([
					{
						$match: { _id: mongoose.Types.ObjectId(id)}
					},
					{
						$project: {
							_id: 1,
							art: 1,
							title: 1,
							priceLabs: 1,
							priceProd: 1,
							description: 1,
							active: 1,
							price: {
								$cond: { 
									if: {
										$gte: ["$priceProd.invitro", 0] 
									}, 
									then: "$priceProd.invitro",
									else: { 
										$max: ["$priceProd.helix", "$priceProd.cmd"] 
									}	 
								}
							}
						}
					}
				])
				.exec(function (err, result) {
					if(err) reject(err);
					else {
						resolve(result[0]);
					}
				});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let analyzes = new AnalyzesSchema(data);

			analyzes.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить данные анализа"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			AnalyzesSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
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
			AnalyzesSchema.remove({ _id: id }, function(errors, result) {
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

module.exports = analyzesManager;