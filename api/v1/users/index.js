const express = require("express");
let app = module.exports = express();

const UserModel = require("./User.model");
let personManager = require("../persons/crud");
let userManager = require("./crud");
let parseData = require("./middleware").parseData;
let dbFunc = require("./db-func");

/* GET items list. */
app.get("/", function(req, res, next) {

	UserModel
		.aggregate([
				{
					$lookup: {
						from: "persons",
						localField: "personId",
						foreignField: "_id",
						as: "person"
					}
				},
				{
					$unwind: {
						path: "$person",
						preserveNullAndEmptyArrays: true
					}
				}
			])
		.exec(function(err, foundObjects) {
			res.json(foundObjects);
		});
});

/* GET one item. */
app.get("/:id", function(req, res, next) {
		
	userManager
		.read(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Пользователь не найден"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});

/* Insert item */
app.post("/", parseData, function(req, res, next){

	userManager
		.create(req.body)
		.then((user) => dbFunc.checkPerson(req.body, user))
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));

});

app.put("/:id", parseData, function(req, res, next){
	delete req.body.username;

	dbFunc
		.checkPerson2(req.body)
		.then((data) => userManager.update(req.params.id, data))
		.then((modifyData) => userManager.read(req.params.id))
		.then((doctor) => res.status(200).json(doctor))
		.catch((errors) => res.status(400).json({errors}));
	/*userManager
		.read(req.params.id)
		.then((user) => dbFunc.checkPerson(req.body, user))
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));*/
});

app.delete("/:id", function(req, res, next) {

	userManager
		.delete(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Пользователь не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
