const mongoose = require('mongoose');
const PaymentSchema = require('../Payment.schema');

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
				 //   	{
				 //   		$unwind: {
				 //      		path: "$specialists",
				 //      		preserveNullAndEmptyArrays: true
				 //      	}
				 //   	},
				 //   	{
					// 	$lookup: {
					// 		from: "doctors",
					// 		localField: "specialists",
					// 		foreignField: "_id",
					// 		as: "specialists"
					// 	}
					// },
					// {
				 //   		$unwind: {
				 //      		path: "$specialists",
				 //      		preserveNullAndEmptyArrays: true
				 //      	}
				 //   	},
				   	{
				      	$unwind:  {
				      		path: "$services",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
						$lookup: {
							from: "services",
							localField: "services._id",
							foreignField: "_id",
							as: "servicesLup"
						}
					},
					{
						$addFields: {
							'servicesLup.count' : '$services.count',
							'servicesLup.price' : '$services.price'
						}
					},
					{
				      	$unwind: {
				      		path: "$servicesLup",
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
							services: { $push: "$servicesLup"},
							analyzes: { $first: "$analyzes"},
							payment: { $first: "$payment"},
							'type': { $first: "$type"},
							discount: { $first: "$discount"},
							status: { $first: "$status"},
							person: { $first: "$person"}
				   		}
				   	},
				   	{
				      	$unwind:  {
				      		path: "$analyzes",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
						$lookup: {
							from: "analyzes",
							localField: "analyzes._id",
							foreignField: "_id",
							as: "analyzesLup"
						}
					},
					{
						$addFields: {
							'analyzesLup.count' : '$analyzes.count',
							'analyzesLup.price' : '$analyzes.price'
						}
					},
					{
				      	$unwind: {
				      		path: "$analyzesLup",
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
							services: { $first: "$services"},
							analyzes: { $addToSet: "$analyzesLup"},
							payment: { $first: "$payment"},
							'type': { $first: "$type"},
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