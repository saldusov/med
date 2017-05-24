const path = require("path");
const UserSchema = require("../User.schema");
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp
const cfg = require(path.resolve("api/global")).config;

const personManager = require("../../persons/crud");
const userManager = require("../crud");
const dbFunc = require("../db-func");

module.exports =  {
	getUsers: function(params) {
		return new Promise((resolve, reject) => {
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
				.exec(function (err, foundItems) {
					if(err) {
						reject(err);
					} else {
						resolve(foundItems);
					}
				});
		});
	},

	getUserById: function(id) {
		return userManager
			.read(id);
	},

	addUser: function(data) {
		return dbFunc
			.checkPerson(data)
			.then(dataWithPerson => userManager.create(dataWithPerson))
			.then(user => userManager.read(user._id));
	},

	updateUser: function(id, data) {
		return userManager
			.read(id)
			.then((user) => {
				if(user) {
					return dbFunc
						.checkPerson(data)
						.then((dataWithPerson) => userManager.update(user, dataWithPerson));
				} else {
					res.status(404).json({errors: ["Пользователь не существует"]});
				}
			})
			.then((modifyData) => userManager.read(id));
	},

	deleteUserById: function(id) {
		return userManager
			.delete(id);
	},

	loginUser: function(body) {
		return new Promise((resolve, reject) => {
			if (body.username && body.password) {
		        var username = body.username;
		        var password = body.password;
		       	UserSchema.findOne({username}, (error, user) => {
			        if (error) {
			          reject({error});
			        }

			        if (!user || !user.checkPassword(password)) {
			          reject("Нет такого пользователя или пароль неверен.");
			        } else {
						//--payload - информация которую мы храним в токене и можем из него получать
						const payload = {
							id: user.id,
							username: user.username
						};
						const token = jwt.sign(payload, cfg.jwtSecret); //здесь создается JWT
						resolve({username: user.username, token: 'JWT ' + token});
					}
		      	});
		    } else {
		    	reject("Не указано имя или пароль");
		    }	
		});
	}
}


