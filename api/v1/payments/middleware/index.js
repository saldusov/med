const mongoose = require("mongoose");
let vtPerson = require("../../persons/valid-transf");
let vtPayments = require("./valid-transf");

module.exports = {
	parseQuery: function(req, res, next) {
		let params = req.query ? req.query : req.params;

		if(params) {
			var andOper = [];
			if(params.date_to) andOper.push({createdAt: {$lt: new Date(params.date_to)}});
			if(params.date_from) andOper.push({createdAt: {$gte: new Date(params.date_from)}});

			// Фильтруем только по специалисту
			if(req.user.group == 'user-spec') params.specialists = [req.user.specialist._id];
			if(params.specialists) andOper.push({specialists: { 
				$in : params.specialists.map(_id => mongoose.Types.ObjectId(_id)) 
			}});
		}

		req.mongoParams = {
			pageNumber: params.pageNumber || 0,
			nPerPage: params.nPerPage || 0,
			sort: params.sort || 1
		};

		req.mongoParams.match = (!!andOper && andOper.length > 0) ? { $and: andOper } : undefined;

		//console.log(req.mongoParams.match.$and);
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
	},

	parseDataPay: function(req, res, next) {
		next();
	}
}