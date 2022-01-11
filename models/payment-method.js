const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    paymentType: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
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