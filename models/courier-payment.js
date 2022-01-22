const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    courierService: {
        type: Schema.Types.ObjectId,
        ref: 'CourierService',
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    totalPaid: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('CourierPayment', schema);