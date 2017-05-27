let vtPersons = require("../persons/valid-transf");
let vtSpecialists = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if((req.body.personId ? true : vtPersons.validation(req.body.person, errors)) && vtSpecialists.validation(req.body, errors)) {
			if(!req.body.personId) {
				vtPersons.transform(req.body.person);
			}
			
			vtSpecialists.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}