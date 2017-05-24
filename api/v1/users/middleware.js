let vt = require("./valid-transf");
let vtPerson = require("../persons/valid-transf");
const rulesManager = require("./lib/tempRules");
const passport = require('passport'); 

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
	},

	checkAccess: function(rule) {
		return function(req, res, next) {
			let allowed = rulesManager.get(req.user.group);
			if(allowed.indexOf(rule) >= 0) {
				next();
			} else {
				res.status(403).send("forbidden");
			}
		}
	}
}
