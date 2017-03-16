const express = require("express");
let app = module.exports = express();

let AnalyzesSchema = require('./Analyzes.schema');
let parseData = require("./middleware").parseData;
let crud = require("./crud");

/* GET patiens list. */
app.get('/', function(req, res, next) {
	AnalyzesSchema.find(function(err, foundItems) {
		res.json(foundItems);
	});
});

app.get('/:id', function(req, res, next) {
	AnalyzesSchema.findOne({_id: req.params.id}).exec(function(err, foundItem) {
		res.json(foundItem);
	});
});

app.post('/', parseData, function(req, res, next){
	
	crud
		.create(req.body)
		.then((person) => res.status(200).json(person))
		.catch((errors) => res.status(400).json({errors}));

});

app.put('/:id', parseData, function(req, res, next){
	
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
