module.exports = {
	parseData: function(req, res, next) {
		let errors = [];

		if(!req.body.last_name) errors.push("Укажите фамилию!");
		if(!req.body.first_name) errors.push("Укажите имя!");

		req.body.first_name = req.body.first_name.toLowerCase();
		req.body.last_name = req.body.last_name.toLowerCase();
		if(req.body.second_name) req.body.second_name = req.body.second_name.toLowerCase();
		if(req.body.email) req.body.email = req.body.email.toLowerCase();
		if(req.body.birthdate) req.body.birthdate = new Date(req.body.birthdate);

		if(errors.length > 0) {
			res.status(400).json({errors});
		} else {
			next();
		}
	} 
}