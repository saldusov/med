let vt = require("./valid-transf");
let vtPerson = require("../persons/valid-transf");

module.exports = {
	parseAddData: function(req, res, next) {
		let errors = [];

		if(vtPerson.checkCreate(req.body)) {
			vtPerson.validation(req.body.person, errors);
		}

		if(vt.validation(req.body, errors)) {
			vt.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	},

	parseUpdateData: function(req, res, next) {
		vt.transform(req.body);
		next();
	}
}