const PaymentSchema = require("../../Payment.schema");

let servicesReports = {
	getTotalServicesByDate: function(date_from, date_to) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				{
					$match: {
						$and: [
							{ createdAt: { $gte: date_from } },
							{ createdAt: { $lt: date_to } }
						]
					}
				},
				{ 
					$unwind: {
						path: "$specialists",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"services.serialNumber" : "$serialNumber",
						"services.paymentId": "$_id"
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists" },
						services: { $push: "$services" }
					}
				},
				{ 
					$unwind: {
						path: "$services"
					}
				},
				{ 
					$unwind: {
						path: "$services"
					}
				},
				{
					$lookup: {
						from: "services",
						localField: "services._id",
						foreignField: "_id",
						as: "sservices"
					}
				},
				{ 
					$unwind: {
						path: "$sservices",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"sservices.price": "$services.price",
						"sservices.serialNumber" : "$services.serialNumber",
						"sservices.paymentId": "$services.paymentId"
					}
				},
				{
					$group: {
						_id: "$specialists",
						services: { $push: "$sservices" },
						totalServicesPrice: { $sum: "$services.price" },
						count: { $sum: 1 }
					}
				}
			])
			.exec(function(errors, foundItems) {
				if(errors) {
					reject(errors);
				} else {
					if(!foundItems) {
						resolve([]);
					} else {
						resolve(foundItems)
					}
				}
			});
		});
	},

	getTotalAnalyzesByDate: function(date_from, date_to) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				{
					$match: {
						$and: [
							{ createdAt: { $gte: date_from } },
							{ createdAt: { $lt: date_to } }
						]
					}
				},
				{ 
					$unwind: {
						path: "$specialists",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"analyzes.serialNumber" : "$serialNumber",
						"analyzes.paymentId": "$_id"
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists" },
						analyzes: { $push: "$analyzes" }
					}
				},
				{ 
					$unwind: {
						path: "$analyzes"
					}
				},
				{ 
					$unwind: {
						path: "$analyzes"
					}
				},
				{
					$lookup: {
						from: "analyzes",
						localField: "analyzes._id",
						foreignField: "_id",
						as: "sanalyzes"
					}
				},
				{ 
					$unwind: {
						path: "$sanalyzes",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"sanalyzes.price": "$analyzes.price",
						"sanalyzes.serialNumber" : "$analyzes.serialNumber",
						"sanalyzes.paymentId": "$analyzes.paymentId"
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists"},
						analyzes: { $push: "$sanalyzes" },
						totalAnalyzesPrice: { $sum: "$analyzes.price" },
						count: { $sum: 1 }
					}
				}
			])
			.exec(function(errors, foundItems) {
				if(errors) {
					reject(errors);
				} else {
					if(!foundItems) {
						resolve([]);
					} else {
						resolve(foundItems)
					}
				}
			});
		});
	},

	getTotalGoodsByDate: function(date_from, date_to) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				{
					$match: {
						$and: [
							{ createdAt: { $gte: date_from } },
							{ createdAt: { $lt: date_to } }
						]
					}
				},
				{ 
					$unwind: {
						path: "$specialists",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"goods.serialNumber" : "$serialNumber",
						"goods.paymentId": "$_id"
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists" },
						goods: { $push: "$goods" }
					}
				},
				{ 
					$unwind: {
						path: "$goods"
					}
				},
				{ 
					$unwind: {
						path: "$goods"
					}
				},
				{
					$lookup: {
						from: "goods",
						localField: "goods._id",
						foreignField: "_id",
						as: "sgoods"
					}
				},
				{ 
					$unwind: {
						path: "$sgoods",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$addFields: {
						"sgoods.price": "$goods.price",
						"sgoods.serialNumber" : "$goods.serialNumber",
						"sgoods.paymentId": "$goods.paymentId"
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists"},
						goods: { $push: "$sgoods" },
						totalGoodsPrice: { $sum: "$goods.price" },
						count: { $sum: 1 }
					}
				}
			])
			.exec(function(errors, foundItems) {
				if(errors) {
					reject(errors);
				} else {
					if(!foundItems) {
						resolve([]);
					} else {
						resolve(foundItems)
					}
				}
			});
		});
	},

	getTotalPaymentsByDate: function(date_from, date_to) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				{
					$match: {
						$and: [
							{ createdAt: { $gte: date_from } },
							{ createdAt: { $lt: date_to } }
						]
					}
				},
				{ 
					$unwind: {
						path: "$specialists",
						preserveNullAndEmptyArrays: true
					}
				},
				{
					$group: {
						_id: "$specialists",
						specialists: { $first: "$specialists" },
						totalPaymentsPrice: { $sum: "$payment.paid" },
						totalPaymentsCount: { $sum: 1 }
					}
				},
				{
					$lookup: {
						from: "specialists",
						localField: "_id",
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
				}
			])
			.exec(function(errors, foundItems) {
				if(errors) {
					reject(errors);
				} else {
					if(!foundItems) {
						resolve([]);
					} else {
						resolve(foundItems)
					}
				}
			});
		});
	}
}


module.exports = servicesReports;
