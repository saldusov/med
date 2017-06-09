const ServiceSchema = require('../Service.schema');

const dbQueryConstructor = require('./dbQueryConstructor')
const serviceCRUD = require("../db/crud");

module.exports =  {
	getServices: function(params) {
		return new Promise((resolve, reject) => {
			ServiceSchema
				.aggregate(dbQueryConstructor.getAggregateParams(params))
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						ServiceSchema.count(params.match ? params.match.$match : {}, function(err, count) {
							resolve({count, items: foundItems});
						});
					}
				});
		});
	},

	getServiceById: function(id) {
		return serviceCRUD
			.read(id);
	},

	addService: function(data) {
		return serviceCRUD.create(data)
			.then((service) => service);
	},

	updateService: function(id, data) {
		return serviceCRUD.update(id, data)
			.then((modifyData) => serviceCRUD.read(id))
			.then((service) => service);
	},

	deleteServiceById: function(id) {
		return serviceCRUD
			.delete(id);
	}
}


