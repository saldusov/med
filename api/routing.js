const express = require("express");
let app = module.exports = express();

let v1 = require("./v1");
let test = require("./v1/test");

app.use('/api/v1', v1);
app.use("/test", test);


app.get("*", (req, res) => {
	res.render("index");
});