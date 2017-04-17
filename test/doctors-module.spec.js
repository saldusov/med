var chai = require('chai'),
    assert = chai.assert,
    expect = chai.expect;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/medtest');

let functions = require('../api/v1/doctors/indexFunctions');
const doctors = [
    {
        personId: '58b99237fd16982a10f3f92e',
        tags: ['58b992eefd16982a10f3f932'],
        experience: 10,
        comments: [],
        certificates: [],
        achievements: ['big', 'surg'],
        doctorate: 'def',
        locations: ['bik'],
        active: true
    },
    {
        person: {
            first_name: 'Ольга',
            second_name: 'Анатольевна',
            last_name: 'Салдусова',
            phone: '9039638911',
            gender: 'female'
        },
        tags: ['58b992eefd16982a10f3f932', '58b992e8fd16982a10f3f931'],
        experience: 10,
        comments: [],
        certificates: [],
        achievements: ['big', 'surg'],
        doctorate: 'def',
        locations: ['bik'],
        active: true
    }
];

describe("Проверим модуль doctors", function(){
  this.timeout(5000);

  it("Вызовем метод getOne c аргументов '58b995ca8b9f5c2d8421ca58', должны получить объект с _id равный '58b995ca8b9f5c2d8421ca58'", function(done){
    functions.getOne('58b995ca8b9f5c2d8421ca58')
    	.then((foundItem) => {
    		assert.isTrue(foundItem._id == '58b995ca8b9f5c2d8421ca58');
    		done();
    	})
    	.catch(errors => {
        console.log(errors);
        done(errors);
      });
  });

  it("Вызовем метод get, должны получить не пустой массив", function(done){
    functions.get()
        .then(foundItems => {
            assert.isTrue(foundItems.length > 0);
            console.log(foundItems[0]._id);
            done();
        })
        .catch(errors => {
            console.log(errors);
            done(errors);
        });
  });

  it.only("Вызовем метод add для doctors[1], должны получить врача и проверим сохранилась ли person информация", function(done) {
    functions.add(doctors[1])
        .then((doctor) => {
          console.log(doctor);
            assert.isNotNull(doctor._id);
            assert.equal(doctors[1].person.last_name, doctor.person.last_name);
            done();
        })
        .catch(errors => {
            console.log(errors);
            done(errors);
        });
  });

  it("Вызовум метод delete для первого найденого врача с помощью метода get, должны получить status = 'ok'", function(done) {

    functions.get()
        .then(foundItems => functions.deleteOne(foundItems[0]._id))
        .then(result => {
          assert.equal(result.status, 'ok');
          done();
        })
        .catch(errors => {
            console.log(errors);
            done(errors);
        });
  });

});