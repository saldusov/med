const mongoXlsx = require('mongo-xlsx');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/medtest');
const AnalyzesSchema = require("./api/v1/analyzes/Analyzes.schema");

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

/*mongoXlsx.xlsx2MongoData("./jjj.xlsx", model, function(err, mongoData) {

	let resultArray = [];
	let summ = 0;
	//console.log(mongoData);
	mongoData[0]
		.map((data) => {
			
			AnalyzesSchema
				.aggregate([
					{
						$match: {
							"art.helix": data.art
						}
					},
					{
						$project: {
							art: 1,
							productPrice: 1,
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
						$limit: 20
					}
				])
				.exec(function(error, result) {
					if(error) console.log(error);
					else {
						resultArray.push({
							art: data.art,
							count: data.count,
							price: data.price,
							finish: result[0].finishPrice,
							summ: data.count * result[0].finishPrice
						});

						summ = summ + (parseInt(data.count) * parseInt(result[0].finishPrice));
						console.log(data.count, result[0].finishPrice, (parseInt(data.count) * parseInt(result[0].finishPrice)));
						console.log('Itog: ' + summ);
					}
				});
		});
});*/
//Helix
/*mongoXlsx.xlsx2MongoData("./helix.xlsx", model, function(err, mongoData) {
	let description = null;
	let update = 0;
	let add = 0;
	//console.log(mongoData);
	mongoData[0]
		.map((data) => {
			if(!data.price && description) {
				description = null;
			}

			if(data.art && !data.price) {
				let descr = data.art.split(".");
				description = descr[1].trim();
			}

			if(data.price) {
				data.description = description;	
				AnalyzesSchema.findOne({"art.helix": data.art}, function(error, found) {
					if(error) console.log(error);
					else {
						if(typeof data.price == 'string') {
							data.price = data.price.toString().replace(/(,00| )/g, "");
						}
						if(found) {						
							found.title.helix = data.title;
							found.price.helix = data.price;
							found.description = data.description;
							update++;
							found.save((err, result) => {
								if(err) console.log(err);
								else update++;
							});
						} else {
							data.description = description;
							
							add++;
							let analysis = new AnalyzesSchema({
								art: {
									helix: data.art
								},
								title: {
									helix: data.title
								},
								price: {
									helix: data.price
								},
								description: data.description
							});
							console.log(analysis);
							analysis.save(function(err, result) {
								if(err) console.log(err);
								else add++;
							});
						}

						console.log('Update: '+update, 'Add: '+add);
					}
				});
			}
			
		});
});
*/
// CMD
/*mongoXlsx.xlsx2MongoData("./cmd.xlsx", model, function(err, mongoData) {
	let update = 0;
	let add = 0;
	//console.log(mongoData);
	mongoData[0]
		.map((data) => {
			if(data.price) {
				//data.description = description;	
				AnalyzesSchema.findOne({"art.cmd": data.art}, function(error, found) {
					if(error) console.log(error);
					else {
						if(found) {
							found.title.cmd = data.title;
							found.price.cmd = parseInt(data.price);
							//found.description = data.description;

							update++;
							found.save((err, result) => {
								if(err) console.log(err);
								else update++;
							});
						} else {
							//data.description = description;
							
							add++;
							let analysis = new AnalyzesSchema({
								art: {
									cmd: data.art
								},
								title: {
									cmd: data.title
								},
								price: {
									cmd: parseInt(data.price)
								},
								//description: data.description
							});
							console.log(analysis);
							analysis.save(function(err, result) {
								if(err) console.log(err);
								else add++;
							});
						}

						console.log('Update: '+update, 'Add: '+add);
					}
				});
			}
			
		});
});*/

// Invitro
/*mongoXlsx.xlsx2MongoData("./noprice.xlsx", model, function(err, mongoData) {
	let setDescription = false;
	let description = [];
	let iter = 0;

	mongoData//[0]
		.map((data) => {
			if(setDescription) {
				if(data.art == 'cl') {
					description = [];
					iter = 0;
				}
				//console.log(data.art.cmd, data.art.cmd == 'a')
				if(description.length > 0 && data.art == 'up') {
					description.pop();
					iter = description.length;
				}

				if(!data.price && description.length > iter) {
					description.pop();
					iter = description.length;
				}

				if(data.art && data.art != 'up' && !data.price) {
					//console.log(data.art);
					description.push(data.art.trim());
					iter = description.length;
				}
			}

			if(data.art && data.price) {
				if(setDescription) {
					iter = description.length - 1;
					data.description = description;
				}
				AnalyzesSchema
					.findOne({ "art.invitro" : data.art})
					.exec(function(err, foundObject) {
						if(err) {
							console.log('Read: ', err);
						} else {
							if(foundObject) {
								//foundObject.title.invitro = data.title;
								foundObject.price.invitro = data.price;
								if(!foundObject.art.helix && !foundObject.art.cmd && setDescription) {
									foundObject.description = data.description;
								}
								//foundObject.description = data.description.concat(foundObject.description);

								foundObject.save(function(err, result) {
									if(err) {
										console.log('Save: ', err);
									}
									console.log(result);
								});
							} else {
								foundObject = new AnalyzesSchema({
									art: {invitro: data.art},
									title: {invitro: data.title},
									price: {invitro: data.price}
								});

								
							}

						}
					});
			}
		});
});*/