const mongoose = require('mongoose');
const GoodSchema = require('../Good.schema');

let codeGenerate = {
	generate: () => {
		return new Promise((resolve, reject) => {
			GoodSchema.find({}, function(err, foundsItems) {
				var i = 0;
				var code = 100000;
				var item = null;
				while(item = foundsItems[i]) {
					item.code = code;
					item.save();
					code++;
					i++;
				};

				i = null;
				code = null;
				item = null;

				resolve({status: "ok"});
			});
		});
	}
}

module.exports = codeGenerate;