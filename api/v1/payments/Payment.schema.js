var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var paymentSchema = new Schema({
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
        count: {
            type: Number,
            default: 1
        },
    	price: Number
    }],
    analyzes: [{
    	_id: Schema.ObjectId,
        count: {
            type: Number,
            default: 1
        },
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
        type: {
        	type: String
        },
        isPercent: Boolean,
        number: Number
    },
    status: {
    	type: String,
    	default: 'open'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('payments', paymentSchema);