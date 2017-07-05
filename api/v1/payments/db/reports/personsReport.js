const pipelineBuilder = require("./pipelineBuilder");
const PaymentSchema = require("../../Payment.schema");

let personsReport = {
	getPersonList(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema.aggregate([
				pipelineBuilder.getMatch(params),
				// {
				// 	$group: {
				// 		_id: "$personId",
				// 		totalPaid: { $sum: "$payment.paid" },
				// 		count: { $sum: 1 },
				// 		serialNumbers: { $push: "$serialNumber" },
				// 		dates: { $push: "$createdAt" },
				// 		paymentIds: { $push: "$_id" }
				// 	}
				// },
				{
					$project: {
						date: "$createdAt",
						personId: 1,
						createdAt: 1,
						totalPaid: "$payment.paid"
					}
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
					$sort: {
						createdAt: 1
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
};

module.exports = personsReport;