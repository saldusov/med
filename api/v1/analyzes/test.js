const express = require("express");
let app = module.exports = express();

let AnalyzesSchema = require('./Analyzes.schema');

app.get('/', function(req, res, next) {
	//let regexp = new RegExp("кровь", "i");

	// exportModule
	// 	.exportUniq()
	// 	.then((filepath) => {
	// 		console.log('File saved at:', filepath); 
	// 		res.json({success: "ok", filepath: filepath});
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 		res.status(400).json({error});
	// 	});

	/*AnalyzesSchema
		.find()
		.exec(function(err, result) {
			if(err) res.json(err);
			else{
			result.map((analyz) => {
				if(!analyz.productPrice) analyz.productPrice = {};
				let priceCmd = analyz.art.cmd ? analyz.price.cmd : 0;
				let priceHelix = analyz.art.helix ? analyz.price.helix : 0;
				let max = Math.max(priceCmd, priceHelix);

				if(analyz.art.cmd) analyz.productPrice.cmd = func.roundOf(max);
				if(analyz.art.helix) analyz.productPrice.helix = func.roundOf(max);

				if(max) {
					analyz.save(function(err, result) {
						if(err) console.log(err);
						console.log('Saved');
					});
				}
			});
			//res.json(result);
			}
		});*/

	AnalyzesSchema
		.aggregate([
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
		.exec(function(err, result) {
			res.json(result);
		});
});