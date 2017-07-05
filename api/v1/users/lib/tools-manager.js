'use strict';

let toolsManager = {
	createServicesTools: function(rules) {
		var result = false;

		if(rules.indexOf('services') >= 0) {
			result = { 
				title: 'Услуги',
				name: 'services',
				items: [
				  { route: '/services', title: "Список услуг" }
				]
			};

			if(rules.indexOf('services.add')) {
				result.items.push({route: '/services/add', title: "Добавить услугу"});
			}
		}

		return result;
	},

	createGoodsTools: function(rules) {
		var result = false;

		if(rules.indexOf('goods') >= 0) {
			result = { 
				title: 'Товары',
				name: 'goods',
				items: [
				  { route: '/goods', title: "Список товаров" }
				]
			};

			if(rules.indexOf('goods.add')) {
				result.items.push({route: '/goods/add', title: "Добавить товар"});
			}
		}

		return result;
	},

	createPeapleTools: function(rules) {
		var result = false;

		if(rules.indexOf('patients') >= 0 || rules.indexOf('persons') >= 0 || rules.indexOf('users') >= 0 || rules.indexOf('doctors') >= 0) {
			result = { 
		        title: 'Люди',
		        name: 'persons',
		        items: []
	      	};

			if(rules.indexOf('persons') >= 0) {
				result.items.push({route: '/persons', title: "Список людей"});
			}

			if(rules.indexOf('patients') >= 0) {
				result.items.push({route: '/patients', title: "Список пациентов"});
			}

			if(rules.indexOf('specialists') >= 0) {
				result.items.push({route: '/specialists', title: "Список специалистов"});
			}

			if(rules.indexOf('users') >= 0) {
				result.items.push({route: '/users', title: "Список пользователей"});
			}	          
		}

		return result;
	},

	createPaymentsTools: function(rules) {
		var result = false;

		if(rules.indexOf('payments') >= 0) {
			result = {
	      title: 'Расчет',
	      items: [
	        {route: '/payments', name: 'list', title: "Список оплат"}
	      ]
	  	};

			if(rules.indexOf('payments.reserve') >= 0) {
				result.items.push({route: '/payments/pay/reserve', name: 'reserve', title: "Создать заказ"});
			}

			if(rules.indexOf('payments.create') >= 0) {
				result.items.push({route: '/payments/pay/create', name: 'create', title: "Создать талон"});
			}

			if(rules.indexOf('payments.add') >= 0) {
				result.items.push({route: '/payments/pay/add', name: 'add', title: "Оплата"});
			}

			if(rules.indexOf('payments.report.incomemonth') >= 0) {
				result.items.push({route: '/payments/report/incomemonth', name: 'incomemonth', title: "Месячный отчет"});
			}  
		}

		return result;
	},

	createAnalyzesTools: function(rules) {
		var result = false;

		if(rules.indexOf('analyzes') >= 0) {
			result = { 
		        title: 'Анализы',
		        name: 'analyzes',
		        items: [
		          {route: '/analyzes', title: "Список анализов"}
		        ]
	      	};

			if(rules.indexOf('analyzes.add') >= 0) {
				result.items.push({route: '/analyzes/add', title: "Добавить анализ"});
			}
		}

		return result;
	},

	createSpecialtiesTools: function(rules) {
		var result = false;

		if(rules.indexOf('specialties') >= 0) {
			result =  {
				title: 'Специальности',
				items: [
				  {route: '/specialties', name: 'list', title: "Список специальностей"}
				],
				route: '/specialties'
			};
		}

		return result;
	},

	createUploadsTools: function(rules) {
		var result = false;

		if(rules.indexOf('uploads') >= 0) {
			result =  {
			    title: 'Файловый менеджер',
			    items: [
			      {route: '/uploads', name: 'list', title: "Список загрузок"}
			    ],
			    route: '/uploads'
		  	};
		}

		return result;
	}	
};

module.exports = toolsManager;