const express = require("express");
const mongoose = require("mongoose");
let app = module.exports = express();

const getTotalPaymentsByDate = require("../db/reports/servicesReport").getTotalPaymentsByDate;
const getTotalServicesByDate = require("../db/reports/servicesReport").getTotalServicesByDate;
const getTotalAnalyzesByDate = require("../db/reports/servicesReport").getTotalAnalyzesByDate;
const getTotalGoodsByDate = require("../db/reports/servicesReport").getTotalGoodsByDate;
const PaymentSchema = require("../Payment.schema");

app.get('/', function(req, res, next) {
	let today = new Date();
	today.setHours(0, 0, 0, 0);
	let nextDay = new Date(today.getTime() + (24 * 60 * 60 * 1000));
	let date_to = req.query.date_to ? new Date(req.query.date_to) : nextDay;
	let date_from = req.query.date_from ? new Date(req.query.date_from) : today;
	

	Promise.all([
		getTotalPaymentsByDate(date_from, date_to),
		getTotalServicesByDate(date_from, date_to),
		getTotalAnalyzesByDate(date_from, date_to),
		getTotalGoodsByDate(date_from, date_to)
	])
	.then((result) => {
		let [payments, services, analyzes, goods] = result;
		let items = [];

		var fullServicesPrice = 0;
		var fullAnalyzesPrice = 0;
		var fullGoodsPrice = 0;
		var fullDiscountsPrice = 0;
		var fullPaymentPrice = 0;

		payments.forEach((paymentInfo, index) => {
			let servicesInfo = getIntoArrayById(paymentInfo._id, services);
			let analyzesInfo = getIntoArrayById(paymentInfo._id, analyzes);
			let goodsInfo = getIntoArrayById(paymentInfo._id, goods);

			let [totalDiscounts, totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice] = parseTotalPrices(paymentInfo.totalPaymentsPrice, servicesInfo, analyzesInfo, goodsInfo);
			fullServicesPrice += totalServicesPrice;
			fullAnalyzesPrice += totalAnalyzesPrice;
			fullGoodsPrice += totalGoodsPrice;
			fullDiscountsPrice += totalDiscounts;
			fullPaymentPrice += paymentInfo.totalPaymentsPrice;

			items[index] = paymentInfo;
			items[index].totalDiscounts = totalDiscounts;
			items[index].servicesInfo = servicesInfo;
			items[index].analyzesInfo = analyzesInfo;
			items[index].goodsInfo = goodsInfo;
		});

		res.json({fullServicesPrice, fullAnalyzesPrice, fullGoodsPrice, fullDiscountsPrice, fullPaymentPrice, items});
	})
	.catch(errors => res.status(500).json({errors}));		
});

function getIntoArrayById(id, array) {
	return array.find((item) => {
		if(mongoose.Types.ObjectId(item._id).equals(id) || (!item._id && item._id == id)) return true;
	});
}

function parseTotalPrices(paid, services, analyzes, goods) {
	let totalServicesPrice = !!services ? services.totalServicesPrice : 0;
	let totalAnalyzesPrice = !!analyzes ? analyzes.totalAnalyzesPrice : 0;
	let totalGoodsPrice = !!goods ? goods.totalGoodsPrice : 0;

	let totalDiscounts = paid - (totalServicesPrice + totalAnalyzesPrice + totalGoodsPrice);
	return [Math.abs(totalDiscounts), totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice];
}