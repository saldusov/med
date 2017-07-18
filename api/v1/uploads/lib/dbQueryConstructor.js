module.exports = {
	getAggregateParams: getAggregateParams
};	

function getAggregateParams(params) {
	let pageNumber = params.pageNumber > 0 ? ((params.pageNumber-1)*params.nPerPage) : 0;
	let nPerPage = parseInt(params.nPerPage);

	let aggregatePipeline = [{
		$project : {
			filename: 1,
			meta: 1
		}
	}];
	
	if(pageNumber > 0) aggregatePipeline.push({$skip: pageNumber});
	if(nPerPage > 0) aggregatePipeline.push({$limit: nPerPage});
		
	return aggregatePipeline;
}