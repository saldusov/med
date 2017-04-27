let vt = require("./valid-transf");

module.exports = {
	parseQuery: function(req, res, next) {
		let query = {};
		let params = req.query ? req.query : req.body;

		req.mongoParams = {};

		if(params) {
			query = {
				$and: []
			};

			if(params.first_name) query.$and.push({first_name: new RegExp(params.first_name.trim(), "i")});
			if(params.last_name) query.$and.push({last_name: new RegExp(params.last_name.trim(), "i")});
			if(params.phone) query.$and.push({phone: new RegExp(params.phone.trim(), "i")});
			if(params.email) query.$and.push({email: new RegExp(params.email.trim(), "i")});

			if(query.$and.length == 0) query = {};
			
			if(params.text) {
				let arrayText = params.text.split(",");
				let trimArray = arrayText.map((textItem) => textItem.trim());
				let text = "(" + trimArray.join("|") + ")";
				let regexp = new RegExp(text, "i");

				query = {
					$or: [
						{"first_name": regexp},
						{"last_name": regexp},
						{"phone": regexp}
					]
				};
			}
		}

		req.mongoParams.pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 0;
		req.mongoParams.nPerPage = params.nPerPage ? parseInt(params.nPerPage) : 0;
		req.mongoParams.sort = params.sort ? parseInt(params.sort) : 1;

		req.mongoParams.query = query;
		next();
	},
	parseData: function(req, res, next) {
		let errors = [];

		if(vt.validation(req.body, errors)) {
			vt.transform(req.body);
			next();
		} else {
			res.status(400).json({errors});
		}
	} 
}