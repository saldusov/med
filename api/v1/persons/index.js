const express = require("express");
let app = module.exports = express();

let PersonSchema = require('../persons/Person.schema');
let middleware = require("./middleware");
let crud = require("./crud");

/* GET patiens list. */
app.get('/', middleware.parseQuery, function(req, res, next) {
	let pageNumber = req.mongoParams.pageNumber > 0 ? ((req.mongoParams.pageNumber-1)*req.mongoParams.nPerPage) : 0;
	let nPerPage = req.mongoParams.nPerPage;
	
	let cursor = PersonSchema
		.aggregate([
			{
				$match: req.mongoParams.query
			},
			{
				$lookup: {
					from: "files",
					localField: "picture",
					foreignField: "_id",
					as: "picture"
				}
			},
			{
				$unwind: {
					path: "$picture",
					preserveNullAndEmptyArrays: true
				}
			}
		])
        .cursor({batchSize: 1000})
        .exec();

		if(pageNumber > -1 && nPerPage) {
			cursor.skip(pageNumber).limit(nPerPage);
		}

		cursor.toArray(function (err, items) {
			if(err) throw new Error(err);

			PersonSchema.count(req.mongoParams.query, function(err, count) {
				res.json({items, count});
			});
		});
});

app.get('/:id', function(req, res, next) {
	PersonSchema.findOne({_id: req.params.id}).populate('picture').exec(function(err, foundItem) {
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
				res.status(404).json({errros: ["Персональная информация не существует"]})
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
				res.status(404).json({errors: ["Персональная информация не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
