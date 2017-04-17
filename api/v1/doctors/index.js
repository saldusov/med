const express = require("express");
let app = module.exports = express();

let parseData = require("./middleware").parseData;

const get = require("./indexFunctions").get;
const getOne = require("./indexFunctions").getOne;
const add = require("./indexFunctions").add;
const update = require("./indexFunctions").update;
const deleteOne = require("./indexFunctions").deleteOne;

/* GET items list. */
app.get('/', function(req, res, next) {
	get()
		.then(foundItems => res.json(foundItems))
		.catch(errors => res.status(500).json({errors: [errors]}));
});

/* GET one item. */
app.get('/:id', function(req, res, next) {
	getOne(req.params.id)
		.then(foundItem => res.json(foundItem))
		.catch(errors => res.status(500).json({errors: [errors]}));
});

/* Insert item */
app.post('/', parseData, function(req, res, next){
	add(req.body)
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));
});

app.put('/:id', parseData, function(req, res, next){
	update(req.params.id, req.body)
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));
});

app.delete('/:id', function(req, res, next) {
	
	deleteOne(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Персональные данные не существуют"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
