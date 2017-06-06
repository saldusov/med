const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();

const getGoods = require("./lib/goods").getGoods;
const getGoodById = require("./lib/goods").getGoodById;
const addGood = require("./lib/goods").addGood;
const updateGood = require("./lib/goods").updateGood;
const deleteGoodById = require("./lib/goods").deleteGoodById;

let middleware = require("./middleware/goods");

/* GET items list. */
app.get('/', auth.checkAccess("goods"), middleware.parseQuery, function(req, res, next) {

	getGoods(req.mongoParams)
		.then((foundItems) => res.json(foundItems))
		.catch((errors) => res.status(500).json({errors}));
});

/* GET one item. */
app.get('/:id', auth.checkAccess("goods"), function(req, res, next) {

	getGoodById(req.params.id)
		.then((foundItem) => res.json(foundItem))
		.catch((errors) => res.status(404).json({errors}));
});

/* Insert item */
app.post('/', auth.checkAccess("goods.add"), middleware.parseData, function(req, res, next){
	
	addGood(req.body)
		.then((savedItem) => res.json(savedItem))
		.catch((errors) => res.status(400).json({errors}));

});

app.put('/:id', auth.checkAccess("goods.update"), middleware.parseData, function(req, res, next){
	
	updateGood(req.params.id, req.body)
		.then((updatedItem) => res.json(updatedItem))
		.catch((errors) => res.status(400).json({errors}));
});

app.delete('/:id', auth.checkAccess("goods.delete"), function(req, res, next) {

	deleteGoodById(req.params.id)
		.then((deletedInfo) => res.json({status: "ok"}))
		.catch((errors) => res.status(400).json({errors}));
	
});
