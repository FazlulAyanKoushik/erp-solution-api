const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    paymentType: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    slug: {
        type: String,
        required: false
    },
    bank: {
        type: mongoose.Schema.ObjectId,
        ref: 'Bank',
    },
    charge: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('PaymentMethod', schema);