let vt = require("./valid-transf");

module.exports = {
	parseAddData: function(req, res, next) {
		let errors = [];

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