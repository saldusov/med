var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientSchema = new Schema({
	personId: {
		type: Schema.ObjectId,
		require: true
	},
	amb_number: {
		type: Number,
		unique: true,
		require: true
	},
	reg_address: String, // адрес регистрации
	oms: { // полис омс
		series: String,
		number: String
	},
	snils: String, // СНИЛС
	insurans: String, // Наименование страховой организации
	benefit_code: String, // Код категории льготы
	passport: { // Документ (паспорт, миграционная карта)
		type: String,
		series: String,
		number: String,
		issued: String,
		issued_date: Date
	},
	family: { // Семейное положение
		status: String,
		childs: [Schema.ObjectId],
		parent: [Schema.ObjectId]
	},
	active: {
		type: Boolean,
		default: true
	}
},
{
    timestamps: true
});

module.exports = mongoose.model('patients', patientSchema);