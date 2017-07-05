const express = require("express");
const mongoose = require("mongoose");
let app = module.exports = express();

const lib = require("./lib");

app.get('/day', function(req, res, next) {
	let { date_from, specId, mode } = req.query;
	mode = mode || 'specialists';
	date_from = date_from ? new Date(date_from) : new Date();

	lib.getSpecialistsReportByDay({date_from, specId, mode})
		.then(result => res.json(result))
		.catch(errors => res.status(400).json({errors}));	
});

app.get('/incomedate', function(req, res, next) {
	var start = new Date(req.query.date_from);
	start.setHours(0, 0, 0, 0);
    var end = new Date(req.query.date_to);
    end.setHours(0, 0, 0, 0);
    var promises = [];
    while(start <= end) {
        promises.push(lib.getSpecialistsReportByDay({date_from: start, mode: req.query.mode}));
        start.setDate(start.getDate() + 1);
    }

    Promise.all(promises)
		.then(result => decomposeReports(result))
		.then(decomposeResult => res.json(decomposeResult))
    	.catch(errors => res.status(400).json({errors}));
});

app.get('/incomedatespec', function(req, res, next) {
    lib.getDaysReportByDateRange(req.query)
		.then(result => res.json(result))
    	.catch(errors => res.status(400).json({errors}));
});

app.get('/performedwork', function(req, res, next) {
	lib.getTicketsReportByDateRange(req.query)
		.then(result => res.json(result))
    	.catch(errors => res.status(400).json({errors}));
});

app.get('/persons', function(req, res, next){
	lib.getPersonListReport(req.query)
		.then(result => res.json(result))
    	.catch(errors => res.status(400).json({errors}));
});

function decomposeReports(reports) {
	let result = {
		'totalRange': {},
		'fullReport': createTemplateTotal()
	};

	reports.forEach( report => {

		report.items.forEach((specReport) => {
			if(!result.totalRange[specReport._id]) result.totalRange[specReport._id] = createTemplateTotal();
			result.totalRange[specReport._id].totalPaymentsPrice += specReport.totalPaymentsPrice;
			result.fullReport.totalPaymentsPrice += specReport.totalPaymentsPrice;
			result.totalRange[specReport._id].totalServicesPrice += specReport.servicesInfo ? specReport.servicesInfo.totalServicesPrice : 0;
			result.fullReport.totalServicesPrice += specReport.servicesInfo ? specReport.servicesInfo.totalServicesPrice : 0;
			result.totalRange[specReport._id].servicesDiscount += specReport.servicesDiscount;
			result.fullReport.servicesDiscount += specReport.servicesDiscount;
			result.totalRange[specReport._id].totalAnalyzesPrice += specReport.analyzesInfo ? specReport.analyzesInfo.totalAnalyzesPrice: 0;
			result.fullReport.totalAnalyzesPrice += specReport.analyzesInfo ? specReport.analyzesInfo.totalAnalyzesPrice: 0;
			result.totalRange[specReport._id].analyzesDiscount += specReport.analyzesDiscount;
			result.fullReport.analyzesDiscount += specReport.analyzesDiscount;
			result.totalRange[specReport._id].totalGoodsPrice += specReport.goodsInfo ? specReport.goodsInfo.totalGoodsPrice : 0;
			result.fullReport.totalGoodsPrice += specReport.goodsInfo ? specReport.goodsInfo.totalGoodsPrice : 0;
			result.totalRange[specReport._id].goodsDiscount += specReport.goodsDiscount;
			result.fullReport.goodsDiscount += specReport.goodsDiscount;
		}); 

	});

	return result;
}

function createTemplateTotal() {
	return {
		totalPaymentsPrice: 0,
		totalServicesPrice: 0,
		servicesDiscount: 0,
		totalAnalyzesPrice: 0,
		analyzesDiscount: 0,
		totalGoodsPrice: 0,
		goodsDiscount: 0
	}
}