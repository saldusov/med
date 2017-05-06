const request = require("superagent");
const querystring = require('querystring');
const http = require("http");
const assert = require("chai").assert;
const path = require("path");
const dataHelp = require("./help/data");
const paymentHelp = require("./help/payment");
const specHelp = require("./help/specialist");

var server = require(path.resolve('main.js'));

describe("Проверка модуля работы с заказами /api/v1/payments", () => {

	beforeEach((done) => { //Перед каждым тестом чистим базу
      Promise.all(dataHelp.clearAll())
      	.then(() => done());
  	});

	it("Отправляем GET /, должны получить пустой массив", (done) => {
		request.get('http://localhost:3000/api/v1/payments', function(err, httpResponse) {
			let body = httpResponse.body;

			assert.equal(200, httpResponse.statusCode);
			assert.isArray(body);
			assert.equal(body.length, 0);
			done();
		});
	});

	it("Отправляем GET /?date_to=now(), создаем три платёжки и ищем по date_to, должны получить массив из 3 элементов", (done) => {
		preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				let payment1 = paymentHelp.createPayment(person, [service], [analyzes], [specialist], 'open');
				let payment2 = paymentHelp.createPayment(person, [service], [analyzes], [specialist], 'collected');
				let payment3 = paymentHelp.createPayment(person, [service], [analyzes], [specialist], 'closed');

				Promise.all([payment1, payment2, payment3])
					.then(result => {

						let query = { date_to: new Date() };

						request
							.get('http://localhost:3000/api/v1/payments')
							.query(query)
							.end(function(err, httpResponse) {
								let body = httpResponse.body;

								assert.equal(200, httpResponse.statusCode);
								assert.isArray(body);
								assert.equal(body.length, 3);
								done();
							});
					});
			});
	});

	it('Отправляем POST с для статуса "open", не указываем обязательное поле specialists, должны получить объект со статусом 400 и полям errors = ["Выберите специалиста"]', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm(person, [service], [analyzes], [], 'open');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(400, httpResponse.statusCode);	
						assert.isArray(body.errors);
						assert.deepEqual(body.errors, ["Выберите специалиста"]);
						done();
					});
			});
  	});

	it('Отправляем POST с для статуса "open", указываем все поля, должны получить объект со статусом 200 и полями _id, specialists = array, services = array, analyzes = array, status = "reserve"', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm(person, [service], [analyzes], [specialist], 'open');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.isNotNull(body._id);
						assert.isArray(body.specialists);
						assert.equal(body.specialists.length, 1);
						assert.isArray(body.services);
						assert.equal(body.services.length, 1);
						assert.isArray(body.analyzes);
						assert.equal(body.analyzes.length, 1);
						assert.equal(body.status, 'open');
						done();
					});
			});
  	});

  	it('Отправляем POST с для статуса "collected", не указываем обязательные поля specialists, services, analyzes, personId, должны получить объект со статусом 400 и полям errors = ["Выберите специалиста", "Выберите услуги к оплате", "Выберите пациента"]', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm({_id: null}, [], [], [], 'collected');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(400, httpResponse.statusCode);	
						assert.isArray(body.errors);
						assert.deepEqual(body.errors, ["Выберите специалиста", "Выберите услуги к оплате", "Выберите пациента"]);
						done();
					});
			});
  	});

  	it('Отправляем POST для статуса "collected", указываем все поля, должны получить объект со статусом 200 и полями _id, specialists = array, services = array, analyzes = array, status = "collected"', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm(person, [service], [analyzes], [specialist], 'collected');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.isNotNull(body._id);
						assert.isArray(body.specialists);
						assert.equal(body.specialists.length, 1);
						assert.isArray(body.services);
						assert.equal(body.services.length, 1);
						assert.isArray(body.analyzes);
						assert.equal(body.analyzes.length, 1);
						assert.equal(body.status, 'collected');
						done();
					});
			});
  	});

  	it('Отправляем POST с для статуса "close", не указываем следующие поля specialists, services, analyzes, personId, должны получить объект со статусом 400 и полям errors = ["Выберите услуги к оплате"]', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm({_id: null}, [], [], [], 'close');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(400, httpResponse.statusCode);	
						assert.isArray(body.errors);
						assert.deepEqual(body.errors, ["Выберите услуги к оплате"]);
						done();
					});
			});
  	});

  	it('Отправляем POST для статуса "close", указываем все поля, должны получить объект со статусом 200 и полями _id, services = array, analyzes = array, status = "close"', (done) => {
        preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				formPayment = paymentHelp.createDefaultForm(person, [service], [analyzes], [specialist], 'close');

        		request
        			.post('http://localhost:3000/api/v1/payments')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.isNotNull(body._id);
						assert.isArray(body.services);
						assert.equal(body.services.length, 1);
						assert.isArray(body.analyzes);
						assert.equal(body.analyzes.length, 1);
						assert.equal(body.status, 'close');
						done();
					});
			});
  	});

  	it('Отправляем GET /:id, должны получить объект с полями _id, specialists = array, services = array, analyzes = array, status = "open". Так же :id в запросе должен совпадать с полученным _id', function(done) {

  		preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				paymentHelp.createPayment(person, [service], [analyzes], [specialist], 'open')
					.then((payment) => {
						request
		        			.get('http://localhost:3000/api/v1/payments/' + payment.id)
		        			.end(function(err, httpResponse) {
								let body = httpResponse.body;

								assert.equal(200, httpResponse.statusCode);
								assert.isNotNull(body._id);
								assert.equal(payment.id, body._id)
								assert.isArray(body.specialists);
								assert.equal(body.specialists.length, 1);
								assert.isArray(body.services);
								assert.equal(body.services.length, 1);
								assert.isArray(body.analyzes);
								assert.equal(body.analyzes.length, 1);
								assert.equal(body.status, 'open');
								done();
							});
					});
			});
  	});

  	it('Отправляем DELETE /:id, должны получить объект status = "ok"', function(done) {

  		preparePaymentData()
			.then((result) => {
				let { person, analyzes, specialty, service, specialist } = result;

				paymentHelp.createPayment(person, [service], [analyzes], [specialist], 'open')
					.then((payment) => {
						request
		        			.delete('http://localhost:3000/api/v1/payments/' + payment.id)
		        			.end(function(err, httpResponse) {
								let body = httpResponse.body;

								assert.equal(200, httpResponse.statusCode);
								assert.equal(body.status, 'ok');
								done();
							});
					});
			});
  	});

});

function preparePaymentData() {
	let promises = [];
    // Создаем персону, анализ и специальность
    promises.push(dataHelp.createPerson());
    promises.push(dataHelp.createAnalyzes(dataHelp.analyzes[0]));
    promises.push(dataHelp.createSpecialty(dataHelp.specialties[0]));

    return Promise.all(promises)
    	.then((result) => {
    		let promises = [];
    		let [person, analyzes, specialty] = result;
    		let service = dataHelp.services[0];
    		service.tags = [specialty.id];

    		let spec = dataHelp.specialists[0];
    		spec.personId = person.id;
    		spec.tags = [specialty.id];
    		// Создаем услугу и врача
    		promises.push(dataHelp.createService(service));
    		promises.push(dataHelp.createSpecialist(spec));

    		return Promise.all(promises)
    			.then((result) => {
    				let [service, specialist] = result;
    				service.price = service.priceVariant.default;
    				service.count = 1;

    				analyzes.price = analyzes.priceProd.helix;
    				analyzes.count = 1;

    				return { person, analyzes, specialty, service, specialist };
    			});
    	});
}