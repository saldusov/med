const mongoXlsx = require('mongo-xlsx');
const model = require("./Analyzes.schema");
const db = require("./db");

let exportModule = {
	exportAll: () => {
		return new Promise((resolve, reject) => {
			return db
				.getAll()
				.then((foundObjects) => {
					let modelBuild = mongoXlsx.buildDynamicModel(foundObjects);
					mongoXlsx.mongoData2Xlsx(foundObjects, modelBuild, function(err, data) {
					  	return Promise.resolve(data.fullPath);
					});
				});
		});
	},
	exportLab: (name) => {
		return new Promise((resolve, reject) => {
			let query = {};

			if(name == 'helix') query = {"art.helix": {$ne: null}};
			if(name == 'cmd') query = {"art.cmd": {$ne: null}};
			if(name == 'invitro') query = {"art.invitro": {$ne: null}};

			model
				.find(query, "-_id -__v -time -description -active")
				.exec(function(error, foundObjects) {
					if(error) {
						reject(error);
					} else {
						let modelBuild = mongoXlsx.buildDynamicModel(foundObjects);
						mongoXlsx.mongoData2Xlsx(foundObjects, modelBuild, function(err, data) {
						  	resolve(data.fullPath);
						});
					}
				});
		});
	},
	exportUniq: () => {
		return new Promise((resolve, reject) => {
			let query = {};

			query = {
				"art.invitro": {$ne: null},
				"productPrice.invitro": {$ne: null},
				"price.invitro": null
			};

			model
				.find(query, "-_id -__v -time -description -active")
				.exec(function(error, foundObjects) {
					if(error) {
						reject(error);
					} else {
						let modelBuild = mongoXlsx.buildDynamicModel(foundObjects);
						mongoXlsx.mongoData2Xlsx(foundObjects, modelBuild, function(err, data) {
						  	resolve(data.fullPath);
						});
					}
				});
		});
	},
	exportProduct: () => {
		return new Promise((resolve, reject) => {
			model
				.aggregate({
					$project: "-_id -__v -time -description -active"
				})
				.exec(function(error, foundObjects) {
					if(error) {
						reject(error);
					} else {
						let modelBuild = mongoXlsx.buildDynamicModel(foundObjects);
						mongoXlsx.mongoData2Xlsx(foundObjects, modelBuild, function(err, data) {
						  	resolve(data.fullPath);
						});
					}
				});
		});
	}
};

module.exports = exportModule;
/*mongoXlsx.xlsx2MongoData("./fileinvitro.xlsx", model, function(err, mongoData) {
	let description = [];
	let iter = 0;
	mongoData[0]
		.map((data) => {
			if(data.art.invitro == 'cl') {
				description = [];
				iter = 0;
			}
			//console.log(data.art.cmd, data.art.cmd == 'a')
			if(description.length > 0 && data.art.invitro == 'up') {
				description.pop();
				iter = description.length;
			}

			if(!data.price && description.length > iter) {
				description.pop();
				iter = description.length;
			}

			if(data.art.invitro && data.art.invitro != 'up' && !data.price) {
				//console.log(data.art.invitro);
				description.push(data.art.invitro.trim());
				iter = description.length;
			}

			if(data.art.invitro && data.price) {
				iter = description.length - 1;
				data.description = description;
				
				AnalysisSchema
					.findOne({ "art.invitro" : data.art.invitro})
					.exec(function(err, foundObject) {
						if(err) {
							console.log('Read: ', err);
						} else {
							if(foundObject) {
								foundObject.title.invitro = data.title.invitro;
								foundObject.price.invitro = data.price.invitro;
								foundObject.description = data.description.concat(data.description);
								//foundObject.description = data.description.concat(foundObject.description);
							} else {
								foundObject = new AnalysisSchema(data);
							}

							foundObject.save(function(err, result) {
								if(err) {
									console.log('Save: ', err);
									console.log(data);
								}
							});
						}
					});
			}
		});
});*/