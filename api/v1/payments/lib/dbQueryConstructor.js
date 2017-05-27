module.exports = {
	getAggregateParams: getAggregateParams,
	getAggregateGroupParam: getAggregateGroupParam
}

function getAggregateParams(params) {
	let aggregatePipeline = [{
			$lookup: {
				from: "persons",
				localField: "personId",
				foreignField: "_id",
				as: "person"
			}
		},
		{
			$unwind: {
				path: "$person",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$unwind: {
				path: "$specialists",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: "specialists",
				localField: "specialists",
				foreignField: "_id",
				as: "specialists"
			}
		},
		{
			$unwind: {
				path: "$specialists",
				preserveNullAndEmptyArrays: true
			}
		},
		{
			$lookup: {
				from: "persons",
				localField: "specialists.personId",
				foreignField: "_id",
				as: "specialists.person"
			}
		},
		{
			$unwind: {
				path: "$specialists.person",
				preserveNullAndEmptyArrays: true
			}
		},
		getAggregateGroupParam(),
		{
			$sort: { createdAt: -1 }
		}];
	
	if(params.match) aggregatePipeline.unshift({ $match: params.match });
		
	return aggregatePipeline;
}

function getAggregateGroupParam() {
	return {
		$group: { 
			_id: "$_id",
			personId: { $first: "$personId" },
		    specialists: {
		    	$addToSet :
		    	{
			    	$cond: { 
						if: {
							$gt: ["$specialists.person", null] 
						}, 
						then: "$specialists",
						else: null 
					}
				}
		    },
		    referral: { $first: "$referral" },
		    assistant: { $first: "$assistant" },
		    services: { $first: "$services" },
		    analyzes: { $first: "$analyzes" },
		    payment: { $first: "$payment" },
		    type: { $first: "$type" },
		    discount: { $first: "$discount" },
		    status: { $first: "$status" },
		    person: { $first: "$person" },
		    createdAt: { $first: "$createdAt" }
		}
	};
}