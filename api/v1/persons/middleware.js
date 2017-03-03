let vt = require("./valid-transf");

module.exports = {
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