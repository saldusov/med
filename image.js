const fs = require('fs');
const gm = require('gm');

const DIR = './uploads/fullsize/';
const THUMBS_DIR = './uploads/thumbs/';
const FILENAME = 'file1489043824953';

const fsManager = require("./api/v1/uploads/fs-manager");
let fullsizePath = '';
let thumbsPath = '';

fsManager
	.getDir("./uploads")
	.then((result) => {
		[fullsizePath, thumbsPath] = result;
		console.log('Complite', fullsizePath, thumbsPath);
	})
	.catch((errors) => console.log(errors));