let vtPersons = require("../persons/valid-transf");
let vtPatients = require("./valid-transf");

module.exports = {
	parseQuery: function(req, res, next) {
		let query = {};
		let params = req.query ? req.query : req.body;

		req.mongoParams = {};
		if(params.amb_number) {
			query = {amb_number: parseInt(params.amb_number.trim())};
		}

		req.mongoParams.pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 0;
		req.mongoParams.nPerPage = params.nPerPage ? parseInt(params.nPerPage) : 0;
		req.mongoParams.sort = params.sort ? parseInt(params.sort) : 1;

		req.mongoParams.query = query;
		next();
	},
	parseQueryPerson: function(req, res, next) {
		let query = {};
		let params = req.query ? req.query : req.body;

		req.mongoParams.person = {};

		if(params.text) {
			let arrayText = req.query.text.split(",");
			let text = "(" + arrayText.map((textItem) => textItem.trim()).join("|") + ")";
			let regexp = new RegExp(text, "i");

			query = {
				$or: [
					{"person.first_name": regexp},
					{"person.last_name": regexp},
					{"person.phone": regexp},
					{"person.email": regexp}
				]
			};
		}

		req.mongoParams.person.query = query;
		next();
	},
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