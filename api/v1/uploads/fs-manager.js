const fs = require("fs");
const gm = require("gm");

const ROOT_DIR = "./uploads";
let FULLSIZE_DIR = ROOT_DIR + "/fullsize/";
let THUMBS_DIR = ROOT_DIR + "/thumbs/";

fsManager = {
	checkDir: function(path) {
		return new Promise((resolve, reject) => {
			fsManager.count(path)
				.then( count => resolve(true))
				.catch( error => {
					Promise.all([
						fsManager.createDir(FULLSIZE_DIR),
						fsManager.createDir(THUMBS_DIR),
						fsManager.createDir(FULLSIZE_DIR + zeroFill(1, 3) + "/"),
						fsManager.createDir(THUMBS_DIR + zeroFill(1, 3) + "/")
					]).then(() => resolve(true));
				});
		});
	},

	getDir: function(path) {
		let fullsizePath = path + "/fullsize";
		let thumbsPath = path + "/thumbs";

		return fsManager
			.count(fullsizePath) 
			.then((number) => {
				fullsizePath = path + "/fullsize/" + zeroFill(number, 3) + "/";
				thumbsPath = path + "/thumbs/" + zeroFill(number, 3) + "/";

				return fsManager.count(fullsizePath);
			})
			.then((number) => {
				if(number >= 50) {
					return fsManager.createNextDir(path + "/fullsize/")
						.then((fspath) => {
							fullsizePath = fspath;
							return fsManager.createNextDir(path + "/thumbs/");
						})
						.then((path) => Promise.resolve([fullsizePath, path]));
				} else {
					return Promise.resolve([fullsizePath, thumbsPath]);
				}
			});
	},

	createNextDir: function(path) {
		return fsManager
			.count(path)
			.then((number) => fsManager.createDir(path + zeroFill(number + 1, 3) + "/"));
	},

	count: function(path) {
		return new Promise((resolve, reject) => {
			fs.readdir(path, function(errors, items) {
				if(errors) reject([errors]);

				resolve(items ? items.length : 0);
			});
		});
	},

	createDir: function(path) {
		return new Promise((resolve, reject) => {
			fs.mkdir(path, function(errors, result) {
				if(errors) reject(errors);

				resolve(path);
			});
		});
	},

	createThumbs: function(path, thumbs, filename) {
		return new Promise((resolve, reject) => {

			gm(path + filename)
			    .resize(200, 160)
			    .gravity("Center")
			    .extent(200, 160)
			    .quality(75)
			    .noProfile()
			    .write(thumbs + filename, function (errors) {
			        if (errors) reject([errors]);
			        resolve((thumbs + filename).slice(2).replace(/\//g, "\\"));
			    });
		});
	},

	removeFile: function(path) {
		return new Promise((resolve, reject) => {
			fs.unlink(path, function(errors) {
				if(errors) reject(errors);
				else resolve(true);
			});
		});
	}
};

function zeroFill (number, width)  {
	return (parseInt(number, 10) + Math.pow(10, width)).toString().substr(1);
}

module.exports = fsManager;