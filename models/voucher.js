const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    voucherNo: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true
    },
    transactionTypeSlug: {
        type: String,
        required: true
    },
    transactionAccount: {
        type: String,
        required: true
    },
    account: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Voucher', schema);