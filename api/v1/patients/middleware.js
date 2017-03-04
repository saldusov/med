let vtPersons = require("../persons/valid-transf");
let vtPatients = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if((req.body.personId ? true : vtPersons.validation(req.body, errors)) && vtPatients.validation(req.body, errors)) {
			if(!req.body.personId) {
				vtPersons.transform(req.body);
			}

			vtPatients.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}