var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
    serialNumber: Number,
	personId: {
		type: Schema.ObjectId,

	},
    specialists: {
    	type: [Schema.ObjectId]
    },
    referral: {
    	type: Schema.ObjectId
    },
    assistant: {
    	type: [Schema.ObjectId]
    },
    services: [{
    	_id: Schema.ObjectId,
    	price: Number
    }],
    analyzes: [{
    	_id: Schema.ObjectId,
    	price: Number
    }],
    goods: [{
        _id: Schema.ObjectId,
        price: Number
    }],
    payment: {
        'type': {
        	type: String
        },
        paid: Number,
        inKass: {
        	type: Boolean,
        	default: false
        }
    },
    type: {
    	type: String,
    	default: 'default'
    },
    discount: {
        services: {
            isPercent: Boolean,
            number: Number
        },
        analyzes: {
            isPercent: Boolean,
            number: Number
        },
        goods: {
            isPercent: Boolean,
            number: Number
        }
    },
    status: {
    	type: String,
    	default: 'open'
    },
    note: String,
    creator: Schema.ObjectId,
    updater: Schema.ObjectId
},
{
    timestamps: true
});

module.exports = mongoose.model('payments', paymentSchema);