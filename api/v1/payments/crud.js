const mongoose = require('mongoose');
const PaymentSchema = require('./Payment.schema');

let PaymentManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			PaymentSchema
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
				      	$unwind:  "$services",
				   	},
				   	{
						$lookup: {
							from: "services",
							localField: "services._id",
							foreignField: "_id",
							as: "services.info"
						}
					},
					{
				      	$unwind: {
				      		path: "$services.info",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
				      	$unwind:  "$analyzes",
				   	},
				   	{
						$lookup: {
							from: "analyzes",
							localField: "analyzes._id",
							foreignField: "_id",
							as: "analyzes.info"
						}
					},
					{
				      	$unwind: {
				      		path: "$analyzes.info",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
				   		$group: {
				   			_id: "$_id",
							personId: { $first: "$personId"},
							specialists: { $first: "$specialists"},
							referral: { $first: "$referral" },
							assistant: { $first: "$assistant"},
							services: { $addToSet: "$services"},
							analyzes: { $addToSet: "$analyzes"},
							payment: { $first: "$payment"},
							'type': { $first: "$'type'"},
							discount: { $first: "$discount"},
							status: { $first: "$status"},
							person: { $first: "$person"}
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
			let Payment = new PaymentSchema(data);

			Payment.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось создать оплату"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		console.log(data);
		return new Promise(function(resolve, reject) {
			PaymentSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
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
			PaymentSchema.remove({ _id: id }, function(errors, result) {
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

module.exports = PaymentManager;