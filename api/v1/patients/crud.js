const PatientSchema = require('./Patient.schema');

let doctorManager = {
	read: function(id) {
		return new Promise(function(resolve, reject) {
			PatientSchema
				.findOne({_id: id}, function(errors, result) {
					if(errors) {
						reject([errors]);
					} else {
						if(!result) {
							resolve(false);
						} else {
							resolve(result);
						}
					}
				});
		});
	},

	create: function(data) {
		return new Promise(function(resolve, reject) {
			let patient = new PatientSchema(data);

			patient.save(function(errors, savedObject){
				if (errors) {
					reject([errors]);
				} else {
					if(!savedObject) {
						reject(["Не удалось сохранить данные пациента"]);
					} else {
						resolve(savedObject);
					}
				}
			});
		});
	},

	update: function(id, data) {
		return new Promise(function(resolve, reject) {
			PatientSchema.update({_id: id}, {$set: data}, function(errors, updatedObject){
				if(errors) {
					reject([errors]);
				} else {
					resolve(updatedObject);
				}
			});
		});
	},

	delete: function(id) {
		return new Promise(function(resolve, reject) {
			PatientSchema.remove({ _id: id }, function(errors, result) {
		    	if (errors) {
					reject([errors]);
		    	} else {
		    		if(result.result.n > 0) {
		    			resolve({status: "ok"});
		    		} else {
		    			resolve(false);
		    		}
		    	}
			});
		});
	}
};

module.exports = doctorManager;