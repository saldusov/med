const PaymentSchema = require('../Payment.schema');

const dbQueryConstructor = require('./dbQueryConstructor')
let dbFunc = require("../db/db-func");
const paymentManager = require("../db/crud");

const emmiterPayment = require("../socket/emmiter");

module.exports =  {
	getPayments: function(params) {
		return new Promise((resolve, reject) => {
			PaymentSchema
				.aggregate(dbQueryConstructor.getAggregateParams(params))
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						resolve(foundItems);
					}
				});
		});
	},

	getPaymentById: function(id) {
		return paymentManager
			.read(id);
	},

	addPayment: function(data) {
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.create(data))
			.then((payment) => {
				emmiterPayment.changePayment(payment);
				return payment;
			});
	},

	payPayment: function(id, data) {
		let payment = {
			payment: data.payment,
			type: data.type || null,
			status: 'closed',
			discount: data.discount || null
		};

		return paymentManager.update(id, payment)
			.then((modifyData) => paymentManager.read(id))
			.then((payment) => {
				emmiterPayment.changePayment(payment);
				return payment;
			});
	},

	updatePayment: function(id, data) {
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.update(id, data))
			.then((modifyData) => paymentManager.read(id))
			.then((payment) => {
				emmiterPayment.changePayment(payment);
				return payment;
			});
	},

	deletePaymentById: function(id) {
		return paymentManager
			.delete(id);
	}
}


