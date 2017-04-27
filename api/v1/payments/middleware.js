let vtPerson = require("../persons/valid-transf");
let vtPayments = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(vtPerson.checkCreate(req.body)) {
			vtPerson.validation(req.body.person, errors);
		}

		if(vtPayments.validation(req.body, errors)) {
			vtPayments.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}