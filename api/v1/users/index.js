const express = require("express");
let app = module.exports = express();
const passport = require('passport'); 

const indexFunctions = require("./lib/indexFunctions");
let middleware = require("./middleware");


/* GET items list. */
app.get("/", function(req, res, next) {
	indexFunctions.getUsers()
		.then((result) => res.status(200).json(result))
		.catch((errros) => res.status(404).json({errors}));
});

app.get('/custom', passport.authenticate('jwt'), function(req, res, next) {
    if (req.user) {
      res.status(200).send("hello " + req.user.username);
    } else {
      res.status(404).send("user not found");
    }
});

/* GET one item. */
app.get("/:id", function(req, res, next) {
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
app.post("/", middleware.parseAddData, function(req, res, next){

	indexFunctions.addUser(req.body)
		.then((user) => res.status(200).json(user))
		.catch((errors) => res.status(400).json({errors}));

});

app.put("/:id", middleware.parseUpdateData, function(req, res, next){

	indexFunctions.updateUser(req.params.id, req.body)
		.then((user) => res.status(200).json(user))
		.catch((errors) => {
			console.log(errors);
			res.status(400).json({errors})
		});

});

app.delete("/:id", function(req, res, next) {

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

app.post('/login', passport.authenticate('local'), function(req, res, next) {
	indexFunctions.loginUser(req.user)
		.then((result) => res.status(200).json(result))
		.catch((errors) => res.status(404).json({errors}));
});