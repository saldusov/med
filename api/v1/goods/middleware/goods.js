const mongoose = require('mongoose');

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
	},

	parseQuery: function(req, res, next) {
		req.mongoParams = {};

		let params = req.query ? req.query : req.body;
		
		req.mongoParams.match = createMatchPipeline(params);

		req.mongoParams.pageNumber = params.pageNumber ? parseInt(params.pageNumber) : 0;
		req.mongoParams.nPerPage = params.nPerPage ? parseInt(params.nPerPage) : 0;
		req.mongoParams.sort = params.sort ? parseInt(params.sort) : 1;

		next();
	}
};

function createMatchPipeline(params) {
	let pipeline = {
		$match: { $and : [] }
	};

	let isEmpty = true;

	if(params.tags) {
		switch(typeof params.tags) {
			case 'object': 
				pipeline.$match.$and.push(createMatchTagsIsArray(params.tags));
				break;
			case 'string':
				pipeline.$match.$and.push(createMatchTagsIsString(params.tags));
				break;
			case 'undefined':
				break;
		}

		isEmpty = false;
	}

	if(params.search) {
		let re = parseSearch(params.search);
		pipeline.$match.$and.push({ 
			$or: [
				{"title": re},
				{"description": re}
			]
		});

		isEmpty = false;
	}

	return isEmpty ? undefined : pipeline;
}

function createMatchTagsIsArray(tags) {
	return { 
		tags: { 
			$in : tags.map(_id => mongoose.Types.ObjectId(_id)) 
		} 
	}
}

function createMatchTagsIsString(tags) {
	switch(tags) {
		case 'empty':
			return getMatchTagsIsEmpty(tags);
			break;
		default:

			break;
	}
}

function getMatchTagsIsEmpty(tags) {
	return {
		tags: { 
			$exists: true,
			$in: [null]
		} 
	}
}

function parseSearch(text) {
	let re = /(,| )/;
	let arrayText = text.split(re);
	let reText = "(" + arrayText.map((textItem) => textItem.trim()).join("|") + ")";
	return new RegExp(reText, "i");
}