const request = require("superagent");
const querystring = require('querystring');
const http = require("http");
const assert = require("chai").assert;
const path = require("path");
const dataHelp = require("./help/data");
const usersHelp = require("./help/users");

var server = require(path.resolve('main.js'));

describe.only("Проверка модуля работы с пользователями /api/v1/users", () => {

	beforeEach((done) => { //Перед каждым тестом чистим базу
     	usersHelp.clearAll()
      		.then(() => done());
  	});

	it("Отправляем GET /, должны получить пустой массив", (done) => {
		request.get('http://localhost:3000/api/v1/users', function(err, httpResponse) {
			let body = httpResponse.body;

			assert.equal(200, httpResponse.statusCode);
			assert.isArray(body);
			assert.equal(body.length, 0);
			done();
		});
	});

	it('Отправляем POST, указываем все поля, должны получить объект со статусом 200 и полями _id, username = "admin", password пустой, active = true', (done) => {

		formPayment = usersHelp.createDefaultForm();

		request
			.post('http://localhost:3000/api/v1/users')
			.send(formPayment)
			.end(function(err, httpResponse) {
				let body = httpResponse.body;

				assert.equal(200, httpResponse.statusCode);
				assert.isNotNull(body._id);
				assert.equal(body.username, 'admin');
				assert.isUndefined(body.password);
				assert.isTrue(body.active);
				done();
			});
  	});

  	it('Отправляем POST /login, должны получить объект с полями username = "admin", token', function(done) {
  		usersHelp.createUser()
			.then((user) => {
				let formPayment = { username: 'admin', password: 'admin' };

				request
        			.post('http://localhost:3000/api/v1/users/login')
        			.send(formPayment)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.equal(body.username, formPayment.username);
						assert.isNotNull(body.token);
						done();
					});
			});
  	});

  	it('Отправляем GET /:id, должны получить объект с полями _id, username = "admin", password пустой, active = true. Так же :id в запросе должен совпадать с полученным _id', function(done) {

  		usersHelp.createUser()
			.then((user) => {
				request
        			.get('http://localhost:3000/api/v1/users/' + user._id)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.equal(body._id, user._id);
						assert.equal(body.username, 'admin');
						assert.isUndefined(body.password);
						assert.isTrue(body.active);
						done();
					});
			});
  	});

  	it('Отправляем DELETE /:id, должны получить объект status = "ok"', function(done) {

  		usersHelp.createUser()
			.then((user) => {	
				request
        			.delete('http://localhost:3000/api/v1/users/' + user._id)
        			.end(function(err, httpResponse) {
						let body = httpResponse.body;

						assert.equal(200, httpResponse.statusCode);
						assert.equal(body.status, 'ok');
						done();
					});
			});
  	});

});