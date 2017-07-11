const mongoXlsx = require('mongo-xlsx');
const ServiceSchema = require('../Service.schema');
const servicesLib = require("./services");

let exportManager = {
	export: () => {
		return new Promise((resolve, reject) => {
			servicesLib.getServices({
				nPerPage: 99999,
				pageNumber: 0
			})
			.then((result) => {
				let data = parseExportData(result.items);
				let modelBuild = mongoXlsx.buildDynamicModel(data);
				mongoXlsx.mongoData2Xlsx(data, modelBuild, function(err, data) {
				  	resolve(data);
				});
			});
		});
	}
};


function parseExportData(data) {
	let result = [];

	data.forEach(item => {
		let service = {};
		
		if(item.priceVariant.default) {
			service = {
				title: item.title,
				price: item.priceVariant.default,
				code: item.code
			};

			result.push(service);
		}

		if(item.priceVariant.top) {
			service = {
				title: item.title + " (ВК)",
				price: item.priceVariant.top,
				code: (item.code + 5000)
			}

			result.push(service);
		}

		if(item.priceVariant.kmn) {
			service = {
				title: item.title + " (КМН)",
				price: item.priceVariant.kmn,
				code: (item.code + 10000)
			};

			result.push(service);
		}
	});

	return result;
}

module.exports = exportManager;
