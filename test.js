const fsManager = require('./api/v1/uploads/fs-manager');

fsManager.removeFile('uploads\\fullsize\\001\\file1494528195405')
	.then( result => console.log(result))
	.catch( error => console.log(error));


