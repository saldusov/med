const express = require("express");
let app = module.exports = express();
const path = require("path");
const auth = require(path.resolve("api/auth"))();
const math = require('../../core/lib/math');

const fs = require("fs");
const multer = require('multer');
const gm = require('gm');

const ROOT_DIR = "./uploads";
let FULLSIZE_DIR = ROOT_DIR + "/fullsize/";
let THUMBS_DIR = ROOT_DIR + "/thumbs/";

const FileSchema = require('./File.schema');
const crud = require('./crud');
const fsManager = require('./fs-manager');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
  	fsManager
  		.checkDir(FULLSIZE_DIR)
  		.then(() => fsManager.getDir(ROOT_DIR))
  		.then((result) => {
  			[FULLSIZE_DIR, THUMBS_DIR] = result;
    		cb(null, FULLSIZE_DIR);
  		});
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + Date.now() + math.random(1, 999999));
  }
})

let upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {

	    var filetypes = /jpeg|jpg|png/;
	    var mimetype = filetypes.test(file.mimetype);
	    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

	    if (mimetype && extname) {
	      return cb(null, true);
	    }

	    cb("Ошибка: Возможно загрузить только файлы с расширением - " + filetypes);
	}
}).single("file");

/* GET items list. */
app.get('/', function(req, res, next) {
	FileSchema
		.find({}, "filename signature path")
		.exec(function(err, foundObjects) {
			res.json(foundObjects);
		});
});

/* GET one item. */
app.get('/:filename', function(req, res, next) {

	FileSchema
		.findOne({filename: req.params.filename}, function(err, foundObject) {
			if(err) {
				res.status(404).send();
			} else {
				if(foundObject) {
					var img = fs.readFileSync(foundObject.path);
					res.writeHead(200, {'Content-Type': foundObject.mimetype });
					res.end(img, 'binary');
				} else {
					res.status(404).send();
				}
			}
		});
});

/* GET one item. */
app.get('/thumbs/:filename', function(req, res, next) {

	FileSchema
		.findOne({filename: req.params.filename}, function(err, foundObject) {
			if(err) {
				res.status(404).send();
			} else {
				if(foundObject) {
					var img = fs.readFileSync(foundObject.thumbs);
					res.writeHead(200, {'Content-Type': foundObject.mimetype });
					res.end(img, 'binary');
				} else {
					res.status(404).send();
				}
			}
		});
});


// Post files
app.post('/', auth.checkAccess("uploads"), function(req, res, next) {
	upload(req, res, function(errors) {
		if(errors) res.status(400).json({errors: [errors]});
		else {
			req.file.signature = req.body.signature;

			fsManager
				.createThumbs(FULLSIZE_DIR, THUMBS_DIR, req.file.filename)
				.then((thumbs) => {
					req.file.thumbs = thumbs;
					return crud.create(req.file);
				})
				.then((result) => res.status(200).json(result))
				.catch((errors) => res.status(400).json([errors]));
		}
	});
});



/* Insert item */
// router.post('/', function(req, res, next){
	
// 	var addItem = req.body;
	
// 	var user = new UsedModel(addItem);
// 	user.save(function(err, savedObject){
// 		if (err) {
// 			throw new Error("500|Error user save!");
// 		} else {
// 			if(!savedObject) {
// 				res.status(404).send();
// 			} else {
// 				res.json(savedObject);
// 			}
// 		}
// 	});

// });

// router.put('/:id', function(req, res, next){
// 	var updateItem = req.body;
// 	UsedModel.findOne({_id: req.params.id}, function(err, foundObject){
// 		if(err) {
// 			throw new Error("500|Error user update!");
// 		} else {
// 			if(!foundObject) {
// 				throw new Error("404|User not found - update request!");
// 			} else {
// 				if(updateItem.email) foundObject.email = updateItem.email;
// 				if(updateItem.username) foundObject.username = updateItem.username;
// 				if(updateItem.password) foundObject.password = updateItem.password;
// 				if(updateItem.group) foundObject.group = updateItem.group;
// 				if(updateItem.resource) foundObject.resource = updateItem.resource;
// 				if(updateItem.info) foundObject.info = updateItem.info;
// 				if(typeof updateItem.active == 'boolean') foundObject.active = updateItem.active; 
				
// 				foundObject.save(function(err, updatedObject){
// 					if(err) {
// 						console.log(err);
// 						res.status(500).send();
// 					} else {
// 						res.status(200).json({_id: updatedObject._id});
// 					}
// 				});
// 			}
// 		}
// 	});
// });

/*app.delete('/all', function(req, res, next) {
	FileSchema
		.remove({}, (err, result) => res.status(200).json(result));
});*/

app.delete('/:id', function(req, res, next) {
	crud
		.read(req.params.id)
		.then((result) => {
			if(result) {
				fsManager.removeFile(result.path);
				fsManager.removeFile(result.thumbs);

				return crud.delete(req.params.id);
			} else {
				res.status(404).json(["Файл не существует"]);
			}
		})
		.then((result) => res.status(200).json(result))
		.catch((errors) => res.status(400).json([errors]));
});