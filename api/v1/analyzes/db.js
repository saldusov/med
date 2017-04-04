const AnalyzesSchema = require('./Analyzes.schema');

let dbManager = {
	getAll() {
		return new Promise((resolve, reject) => {
			AnalyzesSchema
				.aggregate([
					{
						$project: {
							_id: 1,
							art: 1,
							title: 1,
							price: 1,
							productPrice: 1,
							description: 1,
							active: 1,
							finishPrice: {
								$cond: { 
									if: {
										$gte: ["$productPrice.invitro", 0] 
									}, 
									then: "$productPrice.invitro",
									else: { 
										$max: ["$productPrice.helix", "$productPrice.cmd"] 
									}	 
								}
							}
						}
					}
				])
				.exec(function (err, items) {
					if(err) reject(err);
					else {
						resolve(items);
					}
				});
		});
	},

	get(params) {
		return new Promise((resolve, reject) => {
			let pageNumber = params.pageNumber > 0 ? ((params.pageNumber-1)*params.nPerPage) : 0;
			let nPerPage = params.nPerPage;
			
			AnalyzesSchema
				.aggregate([
					{
						$match: params.query
					},
					{
						$project: {
							_id: 1,
							art: 1,
							title: 1,
							price: 1,
							productPrice: 1,
							description: 1,
							active: 1,
							finishPrice: {
								$cond: { 
									if: {
										$gte: ["$productPrice.invitro", 0] 
									}, 
									then: "$productPrice.invitro",
									else: { 
										$max: ["$productPrice.helix", "$productPrice.cmd"] 
									}	 
								}
							}
						}
					},
					{
						$skip: pageNumber
					},
					{
						$limit: nPerPage
					}
				])
				.exec(function (err, items) {
					if(err) reject(err);
					else {
						resolve(items);
					}				
				});
		});
	},

	getCount(params) {
		return new Promise((resolve, reject) => {
			AnalyzesSchema.count(params.query, function(err, count) {
				resolve(count);
			});
		});
	}
}

module.exports = dbManager;