let request = require("supertest");
let app = require("../image");

describe("test servera", () => {
	request(app)
		.get('/')
		.expect(200)
		.end(function(err, res) {
			if (err) throw err;
			console.log(res.body);
		});
});