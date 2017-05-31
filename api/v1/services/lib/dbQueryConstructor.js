module.exports = {
	getAggregateParams: getAggregateParams,
	getAggregateGroupParam: getAggregateGroupParam
};	

function getAggregateParams(params) {
	let aggregatePipeline = [
		{
	      	$unwind: {
	      		path: "$tags",
	      		preserveNullAndEmptyArrays: true
	      	}
	   	},
		{
			$lookup: {
				from: "specialties",
				localField: "tags",
				foreignField: "_id",
				as: "tag_item"
			}
		},
		{
	      	$unwind: {
	      		path: "$tag_item",
	      		preserveNullAndEmptyArrays: true
	      	}
	   	},
		getAggregateGroupParam(),
		{
			$sort: { tags: -1 }
		}];
	
	if(params.match) aggregatePipeline.unshift(params.match);
	if(params.addFields) aggregatePipeline.push(params.addFields);
		
	return aggregatePipeline;
}

function getAggregateGroupParam() {
	return {
		$group: { 
			_id: "$_id",
			title: { $first: "$title" },
			description: { $first: "$description" },
			recommendations: { $first: "$recommendations" },
			priceVariant: { $first: "$priceVariant" },
			time: { $first: "$time" },
			active: { $first: "$active" }, 
			tags: { $addToSet: "$tags" }, 
			tag_names: { $push: "$tag_item.name"}
		}
	};
}