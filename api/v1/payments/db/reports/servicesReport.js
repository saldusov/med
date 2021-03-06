const mongoose = require("mongoose");
const PaymentSchema = require("../../Payment.schema");

let servicesReports = {
	getTotalServicesByDate: function(params) {		
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
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

	getTotalAnalyzesByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
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

	getTotalGoodsByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
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

	getTotalPaymentsByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
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
	},

	getPaymentsByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params)
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

	getPerformedServicesByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
				{
					$unwind: {
						path: "$services"
			      	}
				},
				{
					$group: {
						_id: "$services._id",
						totalPrice: { $sum: "$services.price" },
						count: { $sum: 1 }
					}
				},
				{
					$lookup: {
						from: "services",
						localField: "_id",
						foreignField: "_id",
						as: "info"
					}
				},
				{ 
					$unwind: {
						path: "$info",
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
	},

	getPerformedAnalyzesByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
				{
					$unwind: {
						path: "$analyzes"
			      	}
				},
				{
					$group: {
						_id: "$analyzes._id",
						totalPrice: { $sum: "$analyzes.price" },
						count: { $sum: 1 }
					}
				},
				{
					$lookup: {
						from: "analyzes",
						localField: "_id",
						foreignField: "_id",
						as: "info"
					}
				},
				{ 
					$unwind: {
						path: "$info",
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
	},

	getPerformedGoodsByDate: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				getMatch(params),
				{
					$unwind: {
						path: "$goods"
			      	}
				},
				{
					$group: {
						_id: "$goods._id",
						totalPrice: { $sum: "$goods.price" },
						count: { $sum: 1 }
					}
				},
				{
					$lookup: {
						from: "goods",
						localField: "_id",
						foreignField: "_id",
						as: "info"
					}
				},
				{ 
					$unwind: {
						path: "$info",
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

function getMatch(params) {
	let { date_from, date_to, specId, mode } = params;
	
	var match = {
		$match: {
			$and: [
				{ createdAt: { $gte: date_from } },
				{ createdAt: { $lt: date_to } }
			]
		}
	};

	switch(mode) {
		case 'referral':
			if(specId) match.$match.$and.push({ referral: mongoose.Types.ObjectId(specId) });
			match.$match.$and.push({ referral: { $ne: null } });
			break;
		case 'assistant':
			if(specId) match.$match.$and.push({ assistant: { $in: [mongoose.Types.ObjectId(specId)]} });
			match.$match.$and.push({ assistant: { $ne: [] } });
			break;
		case 'specialists':
		default:
			if(specId) match.$match.$and.push({ specialists: { $in: [mongoose.Types.ObjectId(specId)]} });
			break;
	}

	return match;
}

module.exports = servicesReports;
