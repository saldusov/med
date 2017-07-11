module.exports = {
	getAggregateParams: getAggregateParams,
	getAggregateGroupParam: getAggregateGroupParam
};	

function getAggregateParams(params) {
	let pageNumber = params.pageNumber > 0 ? ((params.pageNumber-1)*params.nPerPage) : 0;
	let nPerPage = params.nPerPage;

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
			$sort: { score: -1 }
		}];
	
	if(params.match) aggregatePipeline.unshift(params.match);
	if(params.addFields) aggregatePipeline.push(params.addFields);
	if(pageNumber > 0) aggregatePipeline.push({$skip: pageNumber});
	if(nPerPage > 0) aggregatePipeline.push({$limit: nPerPage});
		
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
			multiple: { $first: "$multiple" },
			score: { $first: "$score" }, 
			active: { $first: "$active" }, 
			tags: { $addToSet: "$tags" },
			code: { $first: "$code" },
			tag_names: { $push: "$tag_item.name"}
		}
	};
}