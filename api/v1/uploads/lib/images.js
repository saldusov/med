const mongoose = require('mongoose');
const FileSchema = require('../File.schema');

const dbQueryConstructor = require('./dbQueryConstructor')
const fileCRUD = require("../crud");

module.exports =  {
	getImages: function(params) {
		return new Promise((resolve, reject) => {
			FileSchema
				.aggregate(dbQueryConstructor.getAggregateParams(params))
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						FileSchema.count(params.match ? params.match.$match : {}, function(err, count) {
							resolve({count, items: foundItems});
						});
					}
				});
		});
	},

	getImageById: function(id) {
		return fileCRUD
			.read(id);
	},

	addImage: function(data) {
		return fileCRUD.create(data)
			.then((service) => service);
	},

	updateImage: function(id, data) {
		return fileCRUD.update(id, data)
			.then((modifyData) => fileCRUD.read(id))
			.then((service) => service);
	},

	deleteImageById: function(id) {
		return fileCRUD
			.delete(id);
	},

	deleteMany: function(ids) {
		return new Promise((resolve, reject) => {
			FileSchema
				.find({ _id: { $in: ids.map(id => mongoose.Types.ObjectId(id)) }})
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						foundItems.forEach((doc) => doc.remove());
						resolve(foundItems);
					}
				});
		});
	}
}


