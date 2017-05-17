const PaymentSchema = require('../Payment.schema');

const dbQueryConstructor = require('./dbQueryConstructor')
let dbFunc = require("../db/db-func");
const paymentManager = require("../db/crud");

const socketNspPayment = require("../socket/payment");

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
				socketNspPayment.emit('change', { status: payment.status, type: payment.type });
				return payment;
			});
	},

	payPayment: function(id, data) {
		data.status = 'closed';
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.update(id, data))
			.then((modifyData) => paymentManager.read(id))
			.then((payment) => {
				socketNspPayment.emit('change', { status: payment.status, type: payment.type });
				return payment;
			});
	},

	updatePayment: function(id, data) {
		return dbFunc.checkPerson(data)
			.then((data) => paymentManager.update(id, data))
			.then((modifyData) => paymentManager.read(id))
			.then((payment) => {
				socketNspPayment.emit('change', { status: payment.status, type: payment.type });
				return payment;
			});
	},

	deletePaymentById: function(id) {
		return paymentManager
			.delete(id);
	}
}


