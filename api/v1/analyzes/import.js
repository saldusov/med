const mongoXlsx = require('mongo-xlsx');
const model = require("Analysis.schema");

mongoXlsx.xlsx2MongoData("./fileinvitro.xlsx", model, function(err, mongoData) {
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
});