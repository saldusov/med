const mongoXlsx = require('mongo-xlsx');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medtest');
const AnalysisSchema = require("./api/v1/analyzes/Analyzes.schema");

// let model = [
//   {
//     "displayName": "art helix",
//     "access": "art[helix]",
//     "type": "string"
//   },
//   {
//     "displayName": "art cmd",
//     "access": "art[cmd]",
//     "type": "string"
//   },
//   {
//     "displayName": "art invitro",
//     "access": "art[invitro]",
//     "type": "string"
//   },
//   {
//     "displayName": "title helix",
//     "access": "title[helix]",
//     "type": "string"
//   },
//   {
//     "displayName": "title cmd",
//     "access": "title[cmd]",
//     "type": "string"
//   },
//   {
//     "displayName": "title invitro",
//     "access": "title[invitro]",
//     "type": "string"
//   },
//   {
//     "displayName": "price helix",
//     "access": "price[helix]",
//     "type": "number"
//   },
//   {
//     "displayName": "price cmd",
//     "access": "price[cmd]",
//     "type": "number"
//   },
//   {
//     "displayName": "price invitro",
//     "access": "price[invitro]",
//     "type": "string"
//   }
// ];

let model = null;
// Helix
// mongoXlsx.xlsx2MongoData("./file.xlsx", model, function(err, mongoData) {
// 	mongoData[0]
// 		.map((data) => {
// 			let analysis = new AnalysisSchema(data);
// 			analysis.save(function(err, result) {
// 				if(err) console.log(err);
// 			});
// 		});
// });

// CMD
/*mongoXlsx.xlsx2MongoData("./filecmd1.xlsx", model, function(err, mongoData) {
	let description = [];
	let iter = 0;
	mongoData[0]
		.map((data) => {
			//console.log(data.art.cmd, data.art.cmd == 'a')
			if(description.length > 0 && data.art.cmd == 'a') {
				description.pop();
				iter = description.length;
			}

			if(!data.price && description.length > iter) {
				description.pop();
				iter = description.length;
			}

			if(data.art.cmd && data.art.cmd != 'a' && !data.price) {
				//console.log(data.art.cmd);
				description.push(data.art.cmd.trim());
				iter = description.length;
			}

			if(data.art.cmd && data.price) {
				iter = description.length - 1;
				data.description = description;
				//console.log(data);
				AnalysisSchema
					.findOne({ "art.cmd" : data.art.cmd})
					.exec(function(err, foundObject) {
						if(err) {
							console.log('Read: ', err);
						} else {
							if(foundObject) {
								console.log(foundObject.art.cmd + "-" + data.art.cmd);
								foundObject.title.cmd = data.title.cmd;
								foundObject.price.cmd = data.price.cmd;
								foundObject.description = data.description;
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

			//console.log(description);
		});
});*/

// Invitro

mongoXlsx.xlsx2MongoData("./file.xlsx", model, function(err, mongoData) {
	mongoData[0]
		.map((data) => {
			let analysis = new AnalysisSchema(data);
			analysis.save(function(err, result) {
				if(err) console.log(err);
			});
		});
});