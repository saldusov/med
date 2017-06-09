let vt = require("./valid-transf");

module.exports = {
	parseData: function(req, res, next) {
		next();
	},

	mergeItems: function(merge, item) {
		if(typeof merge === 'undefined') merge = '';
		if(typeof merge.helix === 'undefined') merge.helix = '';
		if(typeof merge.cmd === 'undefined') merge.cmd = '';
		if(typeof merge.invitro === 'undefined') merge.invitro = '';
		if(item && typeof item.helix !== 'undefined') merge.helix = item.helix ? item.helix : merge.helix;
		if(item && typeof item.cmd !== 'undefined') merge.cmd = item.cmd ? item.cmd : merge.cmd;
		if(item && typeof item.invitro !== 'undefined') merge.invitro = item.invitro ? item.invitro : merge.invitro; 
	},

	parseQuery: function(req, res, next) {
		let query = {};
		let params = req.query ? req.query : req.body;

		req.mongoParams = {};

		if(params.search) {
			let arrayText = req.query.search.split(",");
			let trimArray = arrayText.map((textItem) => textItem.trim());
			let text = "(" + trimArray.join("|") + ")";
			let regexp = new RegExp(text, "i");

			query = {
				$or: [
					{"title.cmd": regexp},
					{"title.helix": regexp},
					{"title.invitro": regexp},
					{"art.cmd": {$in: trimArray}},
					{"art.helix":  {$in: trimArray}},
					{"art.invitro":  {$in: trimArray}},
					{"description": regexp}
				]
			};
		}

		if(params.labs) {
			let labs = params.labs.split(",");
			let labQuery = {$or: []};
			labs.map((lab) => {
				lab = "art." + lab.trim();
				let params = new Object();
				params[lab] = {$ne: null};
				labQuery.$or.push(params);
			});

			//console.log(labQuery);
			query = {
				$and: [
					query,
					labQuery
				]
			}
		}

		req.mongoParams.pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 0;
		req.mongoParams.nPerPage = params.nPerPage ? parseInt(params.nPerPage) : 0;
		req.mongoParams.sort = params.sort ? parseInt(params.sort) : 1;

		req.mongoParams.query = query;
		next();
	}
}