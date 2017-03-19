const express = require("express");
let app = module.exports = express();

let AnalyzesSchema = require('./Analyzes.schema');
let middleware = require("./middleware");
let crud = require("./crud");

/* GET patiens list. */
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

app.put('/:id', middleware.parseData, function(req, res, next){
	
	crud
		.read(req.params.id)
		.then((person) => {
			if(!person) {
				res.status(404).json({errros: ["Анализ не существует"]})
			} else {
				return crud.update(req.params.id, req.body);
			}
		})
		.then((modifyInfo) => crud.read(req.params.id))
		.then((person) => res.status(200).json(person))
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
