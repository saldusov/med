const nspPayment = require("../socket/payment");

module.exports = {
	changePayment: (payment) => {
		nspPayment.to('all').emit('change', { status: payment.status, type: payment.type });

		for (var i = payment.specialists.length - 1; i >= 0; i--) {
			nspPayment.to(payment.specialists[i]).emit('change', { status: payment.status, type: payment.type });
		}
	}
}