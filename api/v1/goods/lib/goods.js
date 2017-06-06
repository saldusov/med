const GoodSchema = require('../Good.schema');

const dbQueryConstructor = require('./dbQueryConstructor')
const goodCRUD = require("../db/crud");

module.exports =  {
	getGoods: function(params) {
		return new Promise((resolve, reject) => {
			GoodSchema
				.aggregate(dbQueryConstructor.getAggregateParams(params))
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						resolve(foundItems);
					}
				});
		});
	},

	getGoodById: function(id) {
		return goodCRUD
			.read(id);
	},

	addGood: function(data) {
		return goodCRUD.create(data)
			.then((good) => good);
	},

	updateGood: function(id, data) {
		return goodCRUD.update(id, data)
			.then((modifyData) => goodCRUD.read(id))
			.then((good) => good);
	},

	deleteGoodById: function(id) {
		return goodCRUD
			.delete(id);
	}
}


