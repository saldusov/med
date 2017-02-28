const express = require("express");
const mongoose = require("mongoose");
let app = module.exports = express();

let db = mongoose.connection;


app.get("/", (req, res, next) => {

	let collection = db.collection("users");

	collection
		.aggregate([
			{
				$lookup: {
					from: "persons",
					localField: "info",
					foreignField: "_id",
					as: "info"
				}
			},
			{
				$project: {
					username: 1,
					info: 1,
					image_id: "$info.image"
				}
			},
			{
				$lookup: {
					from: "fs.files",
					localField: "image_id",
					foreignField: "_id",
					as: "image"
				}
			},
		])
		.toArray(function (err, result) {
			if(err) throw new Error("500|"+err);
			res.json(result);
		});
});