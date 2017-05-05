const path = require("path");
const PaymentSchema = require(path.resolve('api/v1/payments/Payment.schema'));

function createDefaultForm(person, services, analyzes, specialists, status) {
	let form = {
		personId: person.id,
		specialists: specialists.map((item) => item.id),
		referral: null,
		assistant: [],
		services: services,
		analyzes: analyzes,
		payment: { type: 'cash', paid: 0, inKass: false },
		type: 'default',
		discount: { type: 'default', isPercent: false, number: 0 },
		status: status
	}

	return form;
}

function createPayment(person, services, analyzes, specialists, status) {
	return new Promise((resolve, reject) => {
		let object = new PaymentSchema({
			personId: person.id,
			specialists: specialists.map((item) => item.id),
			referral: null,
			assistant: [],
			services: services,
			analyzes: analyzes,
			payment: { type: 'cash', paid: 0, inKass: false },
			type: 'default',
			discount: { type: 'default', isPercent: false, number: 0 },
			status: status
		});
		object.save((err, payment) => resolve(payment));
	});
}


module.exports = {
	createDefaultForm: createDefaultForm,
	createPayment: createPayment
};