const mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://localhost:27017/medtest111');
const counter = require("./api/v1/counter/counter");


counter.add("payments")
	.then((result) => console.log(result))
	.catch((err) => console.log(err));