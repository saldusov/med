module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(!req.body.name) errors.push("Укажите название!");

		if(errors.length > 0) {
			res.status(400).json({errors});
		} else {
			next();
		}
	} 
}