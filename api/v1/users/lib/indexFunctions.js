const UserSchema = require("../User.schema");
const jwt = require('jsonwebtoken'); // аутентификация по JWT для hhtp

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
			.then((modifyData) => userManager.read(id))
			.then((payment) => {
				socketNspPayment.emit('change', { status: payment.status, type: payment.type });
				return payment;
			});
	},

	deleteUserById: function(id) {
		return userManager
			.delete(id);
	},

	loginUser: function(user) {
		return new Promise((resolve, reject) => {
			if (user == false) {
			  reject(["auth failed"]);
			} else {
			  //--payload - информация которую мы храним в токене и можем из него получать
			  const payload = {
			    id: user.id,
			    username: user.username
			  };
			  const token = jwt.sign(payload, "ht23Ydsj01`1-2^&#DJK1NDNSdha321"); //здесь создается JWT
			  resolve({username: user.username, token: 'JWT ' + token});
			}
		});
	}
}


