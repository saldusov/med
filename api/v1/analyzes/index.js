const express = require("express");
let app = module.exports = express();

const mongoose = require("mongoose");

let AnalyzesSchema = require('./Analyzes.schema');
let middleware = require("./middleware");
let crud = require("./crud");
let exportModule = require("./export");
let func = require("./additFunc");

app.get("/export", function(req, res, next) {
	exportModule
		.exportAll()
		.then((filepath) => {
			console.log('File saved at:', filepath); 
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/export/:name", function(req, res, next) {
	exportModule
		.exportLab(req.params.name)
		.then((filepath) => {
			console.log('File saved at:', filepath); 
			res.json({success: "ok", filepath: filepath});
		})
		.catch((error) => {
			console.log(error);
			res.status(400).json({error});
		});
});

app.get('/test', function(req, res, next) {
	//let regexp = new RegExp("кровь", "i");

	AnalyzesSchema
		.aggregate({
			$project: {
				price: 1,
				title: 1,
				art: 1,
				productPrice: 1
			}
		})
		.exec(function(err, result) {
			if(err) res.json(err);
			else{
			/*result.map((analyz) => {
				analyz.productPrice = {};
				if(analyz.price.cmd) analyz.productPrice.cmd = func.roundOf(analyz.price.cmd);
				if(analyz.price.helix) analyz.productPrice.helix = func.roundOf(analyz.price.helix);
				if(analyz.price.invitro) analyz.productPrice.invitro = func.roundOf(analyz.price.invitro);
				analyz.save(function(err, result) {
					if(err) console.log(err);
					console.log('Saved');
				});
			});*/
			res.json(result);
			}
		});
});

app.get('/', middleware.parseQuery, function(req, res, next) {
	let pageNumber = req.mongoParams.pageNumber > 0 ? ((req.mongoParams.pageNumber-1)*req.mongoParams.nPerPage) : 0;
	let nPerPage = req.mongoParams.nPerPage;
	
	let cursor = AnalyzesSchema
		.aggregate([
			{
				$match: req.mongoParams.query
			}
		])
        .cursor({batchSize: 1000})
        .exec();

		if(pageNumber > -1 && nPerPage) {
			cursor.skip(pageNumber).limit(nPerPage);
		}

		cursor.toArray(function (err, items) {
			if(err) throw new Error(err);

			AnalyzesSchema.count(req.mongoParams.query, function(err, count) {
				res.json({items, count});
			});
		});
});

app.get('/:id', function(req, res, next) {
	AnalyzesSchema.findOne({_id: req.params.id}).exec(function(err, foundItem) {
		res.json(foundItem);
	});
});

app.post('/', middleware.parseData, function(req, res, next){
	
	crud
		.create(req.body)
		.then((person) => res.status(200).json(person))
		.catch((errors) => res.status(400).json({errors}));

});

app.post('/merge', function(req, res, next){
	
	AnalyzesSchema
		.aggregate([
			{
				$match: {
					_id : {$in : req.body.ids.map((id) => mongoose.Types.ObjectId(id)) }
				}
			}
		])
		.exec(function(err, foundItems) {
			if(err) {
				res.status(400).json(err);
			} else {
				if(foundItems.length > 0) {
					let mergeItem = foundItems[0];

					foundItems.filter((item) => {
						if(mergeItem._id != item._id) {
							middleware.mergeItems(mergeItem.art, item.art);
							middleware.mergeItems(mergeItem.title, item.title);
							middleware.mergeItems(mergeItem.price, item.price);
							middleware.mergeItems(mergeItem.time, item.time);
							mergeItem.description = mergeItem.description.concat(item.description);

							crud
								.delete(item._id);
						}
					});

					crud
						.update(mergeItem._id, mergeItem)
						.then((modifyInfo) => res.json(mergeItem))
						.catch((errors) => res.status(400).json({errors}));
					
				} else {
					res.status(404).json({errors: ["Анализы не найдены"]});
				}
			}
		});

});

app.put('/:id', middleware.parseData, function(req, res, next){
	console.log(req.body);

	crud
		.read(req.params.id)
		.then((analyz) => {
			if(!analyz) {
				res.status(404).json({errros: ["Анализ не существует"]})
			} else {
				return crud.update(req.params.id, req.body);
			}
		})
		.then((modifyInfo) => crud.read(req.params.id))
		.then((analyz) => res.status(200).json(analyz))
		.catch((errors) => res.status(400).json({errors}));
});

app.delete('/:id', function(req, res, next) {
	
	crud
		.delete(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Анализ не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});