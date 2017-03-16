module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(req.body._id && req.body._id == null) delete req.body._id;
		if(!req.body.name) errors.push("Укажите название!");

		if(errors.length > 0) {
			res.status(400).json({errors});
		} else {
			next();
		}
	} 
}