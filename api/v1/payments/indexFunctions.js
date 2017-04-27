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
