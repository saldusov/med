const mongoose = require("mongoose");

const getTotalPaymentsByDate = require("../db/reports/incomeRange").getTotalPaymentsByDate;
const getTotalServicesByDate = require("../db/reports/incomeRange").getTotalServicesByDate;
const getTotalAnalyzesByDate = require("../db/reports/incomeRange").getTotalAnalyzesByDate;
const getTotalGoodsByDate = require("../db/reports/incomeRange").getTotalGoodsByDate;

const getReferralTotalPaymentsByDate = require("../db/reports/incomeRange").getReferralTotalPaymentsByDate;
const getReferralTotalServicesByDate = require("../db/reports/incomeRange").getReferralTotalServicesByDate;
const getReferralTotalAnalyzesByDate = require("../db/reports/incomeRange").getReferralTotalAnalyzesByDate;
const getReferralTotalGoodsByDate = require("../db/reports/incomeRange").getReferralTotalGoodsByDate;

const getPerformedServicesByDate = require("../db/reports/servicesReport").getPerformedServicesByDate;
const getPerformedAnalyzesByDate = require("../db/reports/servicesReport").getPerformedAnalyzesByDate;
const getPerformedGoodsByDate = require("../db/reports/servicesReport").getPerformedGoodsByDate;
const getPaymentsByDate = require("../db/reports/servicesReport").getPaymentsByDate;

const getPersonList = require("../db/reports/personsReport").getPersonList;

let lib = {
	getSpecialistsReportByDay(params) {
		let today = params.date_from || new Date();
		today.setHours(0, 0, 0, 0);
		let nextDay = new Date(today.getTime() + (24 * 60 * 60 * 1000));
		let date_to = nextDay;
		date_from = today;

		return getSpecialistsReportByDateRange({date_from, date_to, mode: params.mode, specId: params.specId});
	},

	getSpecialistsReportByDateRange(params) {
		let { date_from, date_to, specId } = params;
		date_from = date_from || new Date();
		date_from.setHours(0, 0, 0, 0);

		date_to = date_to || new Date();
		date_to.setHours(23, 59, 59, 999);
		
		return getSpecialistsReportByDateRange({date_from, date_to, specId, mode: params.mode});
	},

	getDaysReportByDateRange(params) {
		let { date_from, date_to, specId, mode } = params;
		date_from = date_from ? new Date(date_from) : new Date();
		date_from.setHours(0, 0, 0, 0);

		date_to = date_to ? new Date(date_to) : new Date();
		date_to.setHours(23, 59, 59, 999);
		console.log(date_from, date_to);
		
		return getDaysReport({date_from, date_to, specId, mode});
	}, 

	getTicketsReportByDateRange(params) {
		let { date_from, date_to, specId } = params;
		date_from = date_from ? new Date(date_from) : new Date();
		date_from.setHours(0, 0, 0, 0);

		date_to = date_to ? new Date(date_to) : new Date();
		date_to.setHours(23, 59, 59, 999);

		return getPerformedWorkReport({date_from, date_to, specId});
	},

	getPersonListReport(params) {
		let { date_from, date_to, specId } = params;
		date_from = date_from ? new Date(date_from) : new Date();
		date_from.setHours(0, 0, 0, 0);

		date_to = date_to ? new Date(date_to) : new Date();
		date_to.setHours(23, 59, 59, 999);

		return getPersonList({date_from, date_to, specId});	
	}
};

function getPerformedWorkReport(params) {
	return Promise.all([
			getPerformedServicesByDate(params),
			getPerformedAnalyzesByDate(params),
			getPerformedGoodsByDate(params),
			getPaymentsByDate(params)
		])
		.then((result) => {
			let [services, analyzes, goods, payments] = result;
			let report = {
				fullServicesDiscount: 0,
				fullAnalyzesDiscount: 0,
				fullGoodsDiscount: 0,
				fullServicesPrice: 0,
				fullAnalyzesPrice: 0,
				fullGoodsPrice: 0,
				services: services,
				analyzes: analyzes,
				goods: goods
			};

			payments.forEach(payInfo => {
				let [totalDebt, isDebt, totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice, totalServicesDiscount, totalAnalyzesDiscount, totalGoodsDiscount] = parsePayInfo(payInfo);

				report.fullServicesDiscount += totalServicesDiscount;
				report.fullAnalyzesDiscount += totalAnalyzesDiscount;
				report.fullGoodsDiscount += totalGoodsDiscount;
				report.fullServicesPrice += totalServicesPrice;
				report.fullAnalyzesPrice += totalAnalyzesPrice;
				report.fullGoodsPrice += totalGoodsPrice;
			});			

			return report;
		});
}

function getDaysReport(params) {
	return getPaymentsByDate(params)
		.then((paysInfo) => {
			let items = {};

			paysInfo.forEach(payInfo => {
				let date = new Date(payInfo.createdAt);
				date.setHours(0, 0, 0, 0);
				let [totalDebt, isDebt, totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice, totalServicesDiscount, totalAnalyzesDiscount, totalGoodsDiscount] = parsePayInfo(payInfo);
				if(!items[date.getTime()]) items[date.getTime()] = createTemplateTotal();

				items[date.getTime()].totalPaymentsPrice += payInfo.payment.paid;
				items[date.getTime()].totalServicesPrice += totalServicesPrice;
				items[date.getTime()].servicesDiscount += totalServicesDiscount;
				items[date.getTime()].totalAnalyzesPrice += totalAnalyzesPrice;
				items[date.getTime()].analyzesDiscount += totalAnalyzesDiscount;
				items[date.getTime()].totalGoodsPrice += totalGoodsPrice;
				items[date.getTime()].goodsDiscount += totalGoodsDiscount;
			});

			return items;
		});
}

function getSpecialistsReportByDateRange(params) {
	let { date_from, date_to, specId } = params;
	let promise = [];

	if(params.mode == 'referral') {
		promise = [
			getReferralTotalPaymentsByDate(params),
			getReferralTotalServicesByDate(params),
			getReferralTotalAnalyzesByDate(params),
			getReferralTotalGoodsByDate(params),
			getPaymentsByDate(params)
		];
	} else {
		promise = [
			getTotalPaymentsByDate(params),
			getTotalServicesByDate(params),
			getTotalAnalyzesByDate(params),
			getTotalGoodsByDate(params),
			getPaymentsByDate(params)
		];
	};

	return Promise.all(promise)
	.then((result) => {
		let [specialistsPayments, services, analyzes, goods, paysInfo] = result;
		let items = [];
		let fullServicesPrice = 0;
		let discountServices = 0;
		let fullAnalyzesPrice = 0;
		let discountAnalyzes = 0;
		let fullGoodsPrice = 0;
		let discountGoods = 0;
		let fullDiscountsPrice = 0;
		let fullPaymentPrice = 0;
		let fullDebt = 0;

		specialistsPayments.forEach((paymentInfo, index) => {
			let servicesInfo = getIntoArrayById(paymentInfo._id, services);
			let analyzesInfo = getIntoArrayById(paymentInfo._id, analyzes);
			let goodsInfo = getIntoArrayById(paymentInfo._id, goods);

			let [totalDebt, isDebt, totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice, totalServicesDiscount, totalAnalyzesDiscount, totalGoodsDiscount] = parseTotalPrices(paymentInfo, paysInfo, servicesInfo, analyzesInfo, goodsInfo);
			
			fullServicesPrice += totalServicesPrice;
			fullAnalyzesPrice += totalAnalyzesPrice;
			fullGoodsPrice += totalGoodsPrice;
			fullDiscountsPrice += (totalServicesDiscount + totalAnalyzesDiscount + totalGoodsDiscount);
			discountServices += totalServicesDiscount;
			discountAnalyzes += totalAnalyzesDiscount;
			discountGoods += totalGoodsDiscount;
			fullPaymentPrice += paymentInfo.totalPaymentsPrice;
			fullDebt += isDebt ? totalDebt : 0;

			items[index] = paymentInfo;
			items[index].totalDebt = totalDebt;
			items[index].isDebt = isDebt;
			items[index].totalDiscounts = (totalServicesDiscount + totalAnalyzesDiscount + totalGoodsDiscount);
			items[index].servicesInfo = servicesInfo;
			items[index].servicesDiscount = totalServicesDiscount;
			items[index].analyzesInfo = analyzesInfo;
			items[index].analyzesDiscount = totalAnalyzesDiscount;
			items[index].goodsInfo = goodsInfo;
			items[index].goodsDiscount = totalGoodsDiscount;
		});

		return ({fullServicesPrice, fullAnalyzesPrice, fullGoodsPrice, fullDebt, fullDiscountsPrice, discountServices, discountAnalyzes, discountGoods, fullPaymentPrice, items, date: date_from});
	})
	.catch(errors => Promise.reject(errors));
}

function getIntoArrayById(id, array) {
	return array.find((item) => {
		if(mongoose.Types.ObjectId(item._id).equals(id) || (!item._id && item._id == id)) return true;
	});
}

function parsePayInfo(payment) {
	let totalServicesPrice = !!payment.services ? getTotalPrice(payment.services) : 0;
	let totalServicesDiscount = getDiscount(totalServicesPrice, payment.discount.services.number, payment.discount.services.isPercent);
	let totalAnalyzesPrice = !!payment.analyzes ? getTotalPrice(payment.analyzes) : 0;
	let totalAnalyzesDiscount = getDiscount(totalAnalyzesPrice, payment.discount.analyzes.number, payment.discount.analyzes.isPercent);
	let totalGoodsPrice = !!payment.goods ? getTotalPrice(payment.goods) : 0;
	let totalGoodsDiscount = getDiscount(totalGoodsPrice, payment.discount.goods.number, payment.discount.goods.isPercent);

	let totalDebt = payment.payment.paid - ((totalServicesPrice - totalServicesDiscount) + (totalAnalyzesPrice - totalAnalyzesDiscount) + (totalGoodsPrice - totalGoodsDiscount));
	return [Math.abs(totalDebt), (totalDebt < 0), totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice, totalServicesDiscount, totalAnalyzesDiscount, totalGoodsDiscount];
}

function parseTotalPrices(payment, info, services, analyzes, goods) {
	let totalServicesPrice = !!services ? services.totalServicesPrice : 0;
	let totalServicesDiscount = getDiscountInArray(services, info, "services");
	let totalAnalyzesPrice = !!analyzes ? analyzes.totalAnalyzesPrice : 0;
	let totalAnalyzesDiscount = getDiscountInArray(analyzes, info, "analyzes");
	let totalGoodsPrice = !!goods ? goods.totalGoodsPrice : 0;
	let totalGoodsDiscount = getDiscountInArray(goods, info, "goods");

	let totalDebt = payment.totalPaymentsPrice - ((totalServicesPrice - totalServicesDiscount) + (totalAnalyzesPrice - totalAnalyzesDiscount) + (totalGoodsPrice - totalGoodsDiscount));
	return [Math.abs(totalDebt), (totalDebt < 0), totalServicesPrice, totalAnalyzesPrice, totalGoodsPrice, totalServicesDiscount, totalAnalyzesDiscount, totalGoodsDiscount];
}

function getTotalPrice(array) {
	let result = 0;
	array.forEach(item => result += item.price);
	return result;
}

function getDiscount(number, discNumber, isPercent) {
	return isPercent ? (number * ((discNumber || 0) / 100)) : parseInt(discNumber || 0);
}

function getDiscountInArray(items, payments, type) {
	var ids = [];
	var result = 0;

	if(items) {
		items[type].forEach(item => {
			let payment = getIntoArrayById(item.paymentId, payments);
			if(!!!getIntoArrayById(item.paymentId, ids)) {
				let discount = getDiscount(item.price, payment.discount[type].number, payment.discount[type].isPercent);
				item.discount = discount;
				result += discount;
				if(!payment.discount[type].isPercent) {
					ids.push({_id: item.paymentId});
				}
			}
		});
	}

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

module.exports = lib;