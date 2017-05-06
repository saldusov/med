let vtPerson = require("../../persons/valid-transf");
let vtPayments = require("./valid-transf");

module.exports = {
	parseQuery: function(req, res, next) {
		let params = req.query ? req.query : req.params;

		if(params) {
			var andOper = [];
			if(params.date_to) andOper.push({createdAt: {$lte: new Date(params.date_to)}});
			if(params.date_from) andOper.push({createdAt: {$gte: new Date(params.date_from)}});

			if(params.specialists) andOper.push({specialists: { 
				$in : params.specialists.map(_id => mongoose.Types.ObjectId(_id)) 
			}});
		}

		req.mongo = {
			pageNumber: params.pageNumber || 0,
			nPerPage: params.nPerPage || 0,
			sort: params.sort || 1
		};

		req.mongo.match = (!!andOper && andOper.length > 0) ? { $and: andOper } : undefined;
		next();
	},
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