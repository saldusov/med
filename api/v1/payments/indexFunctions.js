const PaymentSchema = require('./Payment.schema');
let dbFunc = require("./db-func");
const paymentManager = require("./crud");

module.exports =  {
	get: function() {
		return new Promise((resolve, reject) => {
			PaymentSchema
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
				   		$unwind: {
				      		path: "$specialists",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
						$lookup: {
							from: "doctors",
							localField: "specialists",
							foreignField: "_id",
							as: "specialists"
						}
					},
				   	{
				   		$unwind: {
				      		path: "$specialists",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
					{
						$lookup: {
							from: "persons",
							localField: "specialists.personId",
							foreignField: "_id",
							as: "specialists.person"
						}
					},
					{
				   		$unwind: {
				      		path: "$specialists.person",
				      		preserveNullAndEmptyArrays: true
				      	}
				   	},
				   	{
						$group: { 
							_id: "$_id",
							personId: { $first: "$personId" },
						    specialists: {
						    	$addToSet :
						    	{
							    	$cond: { 
										if: {
											$gt: ["$specialists.person", null] 
										}, 
										then: "$specialists",
										else: null 
									}
								}
						    },
						    referral: { $first: "$referral" },
						    assistant: { $first: "$assistant" },
						    services: { $first: "$services" },
						    analyzes: { $first: "$analyzes" },
						    payment: { $first: "$payment" },
						    type: { $first: "$type" },
						    discount: { $first: "$discount" },
						    status: { $first: "$status" },
						    person: { $first: "$person" },
						    createdAt: { $first: "$createdAt" }
						}
					},
					{
						$sort: { createdAt: -1 }
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
		return paymentManager
			.read(id);
	},

	add: function(data) {
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.create(data));
	},

	update: function(id, data) {
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.update(id, data))
			.then((modifyData) => paymentManager.read(id));
	},

	deleteOne: function(id) {
		return paymentManager
			.delete(id);
	}
}
