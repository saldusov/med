const express = require("express");
const path = require("path");
let app = module.exports = express();
let auth = require(path.resolve("api/auth"))();
let checkAccess = require("./middleware").checkAccess;
const passport = require("passport");
const cfg = require("../../global").config;
const rulesManager = require("./lib/rules-manager");

const indexFunctions = require("./lib/indexFunctions");
let middleware = require("./middleware");
const rules = require("./lib/rules-manager");


/* GET items list. */
app.get("/", auth.checkAccess("users"), function(req, res, next) {
	indexFunctions.getUsers()
		.then((result) => res.status(200).json(result))
		.catch((errros) => res.status(404).json({errors}));
});

app.get('/custom', auth.authenticate(), function(req, res, next) {
    if (req.user) {
      res.status(200).send("hello " + req.user.username);
    } else {
      res.status(404).send("user not found");
    }
});

app.get('/allowed', auth.authenticate(), function(req, res, next) {
	if (req.user) {
      res.status(200).json(rulesManager.get(req.user.group));
    } else {
      res.status(404).send("user not found");
    }
});

app.get('/tools', auth.checkAccess("tools"), function(req, res, next) {
	if (tools = rules.getTools(req.user.group)) {
      res.status(200).json(tools);
    } else {
      res.status(404).send([]);
    }
});

app.get('/test/:id', function(req, res, next) {
	indexFunctions.getUserByIdTest(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Пользователь не найден"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});
/* GET one item. */
app.get("/:id", auth.checkAccess("users"), function(req, res, next) {
	indexFunctions.getUserById(req.params.id)
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
app.post("/", auth.checkAccess("users.add"),  middleware.parseAddData, function(req, res, next){

	indexFunctions.addUser(req.body)
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));

});

app.put("/:id", auth.checkAccess("users.update"), middleware.parseUpdateData, function(req, res, next){

	indexFunctions.updateUser(req.params.id, req.body)
		.then((user) => res.status(200).json(user))
		.catch((errors) => {
			console.log(errors);
			res.status(400).json({errors})
		});

});

app.delete("/:id", auth.checkAccess("users.delete"), function(req, res, next) {

	indexFunctions.deleteUserById(req.params.id)
		.then((result) => {
			if(!result) {
				res.status(404).json({errors: ["Пользователь не существует"]});
			} else {
				res.status(200).json(result);
			}
		})
		.catch((errors) => res.status(400).json({errors}));
});

app.post('/login', function(req, res, next) {
	indexFunctions.loginUser(req.body)
		.then((result) => res.status(200).json(result))
		.catch((errors) => res.status(404).json({errors}));
});