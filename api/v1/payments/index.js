const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();

let parseData = require("./middleware").parseData;
let parseDataPay = require("./middleware").parseDataPay;
let parseQuery = require("./middleware").parseQuery;

const getPayments = require("./lib/indexFunctions").getPayments;
const getPaymentById = require("./lib/indexFunctions").getPaymentById;
const addPayment = require("./lib/indexFunctions").addPayment;
const updatePayment = require("./lib/indexFunctions").updatePayment;
const payPayment = require("./lib/indexFunctions").payPayment;
const deletePaymentById = require("./lib/indexFunctions").deletePaymentById;

/* GET items list. */
app.get('/', auth.checkAccess("payments"), parseQuery, function(req, res, next) {
	getPayments(req.mongo)
		.then(foundItems => res.json(foundItems))
		.catch(errors => res.status(500).json({errors: [errors]}));
});

/* GET one item. */
app.get('/:id', auth.checkAccess("payments"), function(req, res, next) {
	getPaymentById(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(errors => res.status(500).json({errors: [errors]}));
});

/* Insert item */
app.post('/', auth.checkAccess("payments.add"), parseData, function(req, res, next){
	addPayment(req.body)
		.then((payment) => res.status(200).json(payment))
		.catch((errors) => res.status(400).json({errors}));
});

app.post('/pay/:id', auth.checkAccess("payments.pay"), parseDataPay, function(req, res, next){
	payPayment(req.params.id, req.body)
		.then((payment) => res.status(200).json(payment))
		.catch((errors) => res.status(400).json({errors}));
});

app.put('/:id', auth.checkAccess("payments.update"), parseData, function(req, res, next){
	updatePayment(req.params.id, req.body)
		.then((payment) => res.status(200).json(payment))
		.catch((errors) => res.status(400).json({errors}));
});

app.delete('/:id', auth.checkAccess("payments.delete"), function(req, res, next) {
	
	deletePaymentById(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Платёж не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
