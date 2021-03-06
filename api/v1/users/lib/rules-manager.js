const toolsManager = require("./tools-manager");

const rules = {
	"develop": [
		"analyzes", "analyzes.add", "analyzes.update", "analyzes.delete", 
		"specialists", "specialists.add", "specialists.update", "specialists.delete",
		"patients", "patients.add", "patients.update", "patients.delete", 
		"payments", "payments.add", "payments.create", "payments.reserve", "payments.pay", "payments.update", "payments.delete", 
		"payments.report.incomemonth",
		"persons", "persons.add", "persons.update", "persons.delete",
		"services", "services.add", "services.update", "services.delete", 
		"goods", "goods.add", "goods.update", "goods.delete", 
		"specialties", "specialties.add", "specialties.update", "specialties.delete",
		"uploads",
		"users", "users.auth", "users.add", "users.update", "users.delete"
	],
	"user-admin": [
		"analyzes",
		"specialists",
		"payments", "payments.add", "payments.reserve", "payments.pay",
		"persons", "persons.add", "persons.update",
		"services",
		"goods",
		"specialties", 
		"users.auth",
	],
	"user-spec": [
		"analyzes",
		"specialists",
		"payments", "payments.create",  "payments.add", "payments.onlyself",
		"persons", "persons.add", "persons.update",
		"services",
		"goods",
		"specialties", 
		"users.auth"
	],
	"guest": [
		"users.auth"
	]
};

function getTools(name) {
	let groupRules = getRule(name);
	var tools = [];

	if(peapleTools = toolsManager.createPeapleTools(groupRules)) tools.push(peapleTools);
	if(servicesTools = toolsManager.createServicesTools(groupRules)) tools.push(servicesTools);
	if(goodsTools = toolsManager.createGoodsTools(groupRules)) tools.push(goodsTools);
	if(analyzesTools = toolsManager.createAnalyzesTools(groupRules)) tools.push(analyzesTools);
	if(paymentsTools = toolsManager.createPaymentsTools(groupRules)) tools.push(paymentsTools);
	if(specialtiesTools = toolsManager.createSpecialtiesTools(groupRules)) tools.push(specialtiesTools);
	if(uploadsTools = toolsManager.createUploadsTools(groupRules)) tools.push(uploadsTools);
  
  return tools; 
}

function getRule(name) {
	return rules[name] || rules["guest"];
}

module.exports = {
	get: getRule,
	getTools: getTools
}