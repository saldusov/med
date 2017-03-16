const fs = require("fs");
const gm = require("gm");

fsManager = {
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
			.then((number) => fsManager.createDir(path, (number + 1)));
	},

	count: function(path) {
		return new Promise((resolve, reject) => {
			fs.readdir(path, function(errors, items) {
				if(errors) reject([errors]);

				resolve(items ? items.length : 0);
			});
		});
	},

	createDir: function(path, number) {
		return new Promise((resolve, reject) => {
			let dir_path = path + zeroFill(number, 3) + "/";

			fs.mkdir(dir_path, function(errors, result) {
				if(errors) reject(errors);

				resolve(dir_path);
			});
		});
	},

	createThumbs: function(path, thumbs, filename) {
		return new Promise((resolve, reject) => {

			gm(path + filename)
			    .resize(150, 150)
			    .gravity("Center")
			    .extent(150, 150)
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