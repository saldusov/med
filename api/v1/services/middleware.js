const mongoose = require('mongoose');

module.exports = {
	parseData: function(req, res, next) {
		let errors = [];
		
		if(req.body._id && req.body._id == null) delete req.body._id;
		if(!req.body.title) errors.push("Укажите заголовок!");
		if(!req.body.priceVariant) errors.push("Укажите цену!");

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

		if(params.variant) {
			req.mongoParams.addFields = createAddFieldsPipeline(params);
		} else {
			req.mongoParams.addFields = createAddFieldsPipelineDefault();
		}

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
				{"description": re},
				{"recommendations": re}
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

function createAddFieldsPipeline(params) {
	let fieldName = '$priceVariant.'+ ( ['default', 'top', 'kmn'].indexOf(params.variant) >= 0 ? params.variant : 'default' );

	return {
		$addFields: {
			'price' : { 
				$cond: { 
					if: {
						$gt: [fieldName, 0] 
					}, 
					then: fieldName,
					else: "$priceVariant.default"			
				}
			}
		}
	};
}

function createAddFieldsPipelineDefault() {
	return {
		$addFields: {
			'price' : "$priceVariant.default"
		}
	};
}

function parseSearch(text) {
	let re = /(,| )/;
	let arrayText = text.split(re);
	let reText = "(" + arrayText.map((textItem) => textItem.trim()).join("|") + ")";
	return new RegExp(reText, "i");
}