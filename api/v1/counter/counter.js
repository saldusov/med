const Counter = require("./Counter.schema");

let counterFunctions = {
	get: function(type) {
		return new Promise((resolve, reject) => {
			var [today, tomorove] = createDays();

			Counter.findOne({type: type, date: today}, function(err, result) {
				if(err) reject(err);
				else resolve(!!result ? parseInt(result.count) : 0);
			});
		});
	},

	add: function(type) {
		return new Promise((resolve, reject) => {
			var [today, tomorove] = createDays();

			Counter.findOne({type: type, date: today}).exec(function(err, result) {
				if(err) {
					reject(err);
				} else {
					var count = !!result ? parseInt(result.count) : 0;
					if(count == 0) {
						let countItem = new Counter({type: type, date: today, count: 1});

						countItem.save(function(err, result) {
							if(err) reject(err);
							else {
								resolve(result.count);
							}
						});
					} else {
						Counter.update({type: type, date: today, count: (count + 1)}, function(err, result) {
							if(err) reject(err);
							else {
								if(result.nModified == 1) {
									resolve(count + 1);
								} else {
									reject();
								}
							}
						});
					}
				}
			});
		});
	}
};

function createDays() {
	let now = new Date();
	let tomoroveDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
	let today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
	let tomorove = new Date(tomoroveDate.getFullYear(), tomoroveDate.getMonth(), tomoroveDate.getDate(), 0, 0, 0);

	return [today, tomorove];
}

module.exports = counterFunctions;