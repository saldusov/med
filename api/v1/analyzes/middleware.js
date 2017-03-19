let vt = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		
	},

	parseQuery: function(req, res, next) {
		let query = {};
		let params = req.query ? req.query : req.body;

		req.mongoParams = {};

		if(params.text) {
			let arrayText = req.query.text.split(",");

			let text = "(" + arrayText.map((textItem) => textItem.trim()).join("|") + ")";
			console.log(text);
			let regexp = new RegExp(text, "i");

			query = {
				$or: [
					{"title.cmd": regexp},
					{"title.helix": regexp},
					{"title.invitro": regexp},
					{"description": regexp}
				]
			};
		}

		req.mongoParams.pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 0;
		req.mongoParams.nPerPage = params.nPerPage ? parseInt(params.nPerPage) : 0;
		req.mongoParams.sort = params.sort ? parseInt(params.sort) : 1;

		req.mongoParams.query = query;
		next();
	}
}