module.exports = {
	parseData: function(req, res, next) {
		let errors = [];
		
		if(req.body._id && req.body._id == null) delete req.body._id;
		if(!req.body.title) errors.push("Укажите заголовок!");
		if(!req.body.price) errors.push("Укажите цену!");

		if(errors.length > 0) {
			res.status(400).json({errors});
		} else {
			next();
		}
	} 
}