const express = require("express");
let app = module.exports = express();

const UserSchema = require("./User.schema");
let personManager = require("../persons/crud");
let userManager = require("./crud");
let middleware = require("./middleware");
let dbFunc = require("./db-func");

/* GET items list. */
app.get("/", function(req, res, next) {

	UserSchema
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
app.post("/", middleware.parseAddData, function(req, res, next){

	dbFunc
		.checkPerson(req.body)
		.then((data) => userManager.create(data))
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));

});

app.put("/:id", middleware.parseUpdateData, function(req, res, next){

	userManager
		.read(req.params.id)
		.then((user) => {
			if(user) {
				return dbFunc
					.checkPerson(req.body)
					.then((data) => userManager.update(user, data));
			} else {
				res.status(404).json({errors: ["Пользователь не существует"]});
			}
		})
		.then((modifyData) => userManager.read(req.params.id))
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));

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
