const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();

const mongoose = require("mongoose");

let AnalyzesSchema = require('./Analyzes.schema');
let middleware = require("./middleware");
let crud = require("./crud");
let db = require("./db");
let exportModule = require("./export");
let func = require("./additFunc");
let test = require("./test");

app.use("/test", test);

app.get("/export", auth.checkAccess("analyzes.export"), function(req, res, next) {
	exportModule
		.exportAll()
		.then((filepath) => {
			console.log('File saved at:', filepath); 
		})
		.catch((error) => {
			console.log(error);
		});
});

app.get("/export/:name", auth.checkAccess("analyzes.export"), function(req, res, next) {
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

app.get('/', auth.checkAccess("analyzes"), middleware.parseQuery, function(req, res, next) {

	db
		.get(req.mongoParams)
		.then((result) => res.json(result))
		.catch((error) => res.status(400).json({errors: [error]}));

});

app.get('/count', auth.checkAccess("analyzes"), middleware.parseQuery, function(req, res, next) {

	db
		.getCount(req.mongoParams)
		.then((result) => res.json(result))
		.catch((error) => res.status(400).json({errors: [error]}));

});

app.get('/:id', auth.checkAccess("analyzes"), function(req, res, next) {

	crud
		.read(req.params.id)
		.then((foundItem) => res.json(foundItem))
		.catch((error) => res.status(400).json({errors: [error]}));

});

app.post('/', auth.checkAccess("analyzes.add"), middleware.parseData, function(req, res, next){
	
	crud
		.create(req.body)
		.then((person) => res.status(200).json(person))
		.catch((errors) => res.status(400).json({errors}));

});

app.post('/merge', auth.checkAccess("analyzes.update"), function(req, res, next){
	
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
							middleware.mergeItems(mergeItem.priceLabs, item.priceLabs);
							middleware.mergeItems(mergeItem.priceProd, item.priceProd);
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

app.put('/:id', auth.checkAccess("analyzes.update"), middleware.parseData, function(req, res, next){
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

app.delete('/:id', auth.checkAccess("analyzes.delete"), function(req, res, next) {
	
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