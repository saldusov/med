const mongoose = require("mongoose");

let pipeBuilder = {
	getMatch: (params) => {
		let { date_from, date_to, specId, mode } = params;
		
		var match = {
			$match: {
				$and: [
					{ createdAt: { $gte: date_from } },
					{ createdAt: { $lt: date_to } }
				]
			}
		};

		switch(mode) {
			case 'referral':
				if(specId) match.$match.$and.push({ referral: mongoose.Types.ObjectId(specId) });
				match.$match.$and.push({ referral: { $ne: null } });
				break;
			case 'assistant':
				if(specId) match.$match.$and.push({ assistant: { $in: [mongoose.Types.ObjectId(specId)]} });
				match.$match.$and.push({ assistant: { $ne: [] } });
				break;
			case 'specialists':
			default:
				if(specId) match.$match.$and.push({ specialists: { $in: [mongoose.Types.ObjectId(specId)]} });
				break;
		}
		
		return match;
	}
};

module.exports = pipeBuilder;