const express = require("express");
let app = module.exports = express();
const fs = require('fs');
const path = require("path");
const auth = require(path.resolve("api/auth"))();

const getServices = require("./lib/services").getServices;
const getServiceById = require("./lib/services").getServiceById;
const addService = require("./lib/services").addService;
const updateService = require("./lib/services").updateService;
const deleteServiceById = require("./lib/services").deleteServiceById;
const exportManager = require("./lib/export");

let middleware = require("./middleware");

/* GET items list. */
app.get('/', auth.checkAccess("services"), middleware.parseQuery, function(req, res, next) {

	getServices(req.mongoParams)
		.then((foundItems) => res.json(foundItems))
		.catch((errors) => res.status(500).json({errors}));
});

app.get('/export', function(req, res, next) {
	
	exportManager.export()
		.then((path) => {
			res.json(path);
			//res.pipe(fs.createWriteStream(path));
		})
		.catch((errors) => res.status(404).json({errors}))
});

/* GET one item. */
app.get('/:id', auth.checkAccess("services"), function(req, res, next) {

	getServiceById(req.params.id)
		.then((foundItem) => res.json(foundItem))
		.catch((errors) => res.status(404).json({errors}));
});

/* Insert item */
app.post('/', auth.checkAccess("services.add"), middleware.parseData, function(req, res, next){
	
	addService(req.body)
		.then((savedItem) => res.json(savedItem))
		.catch((errors) => res.status(400).json({errors}));

});

app.put('/:id', auth.checkAccess("services.update"), middleware.parseData, function(req, res, next){
	
	updateService(req.params.id, req.body)
		.then((updatedItem) => res.json(updatedItem))
		.catch((errors) => res.status(400).json({errors}));
});

app.delete('/:id', auth.checkAccess("services.delete"), function(req, res, next) {

	deleteServiceById(req.params.id)
		.then((deletedInfo) => res.json({status: "ok"}))
		.catch((errors) => res.status(400).json({errors}));
	
});
