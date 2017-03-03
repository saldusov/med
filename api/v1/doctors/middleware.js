let vtPersons = require("../persons/valid-transf");
let vtDoctors = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if((req.body.personId ? true : vtPersons.validation(req.body, errors)) && vtDoctors.validation(req.body, errors)) {
			if(!req.body.personId) {
				vtPersons.transform(req.body);
			}

			vtDoctors.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}