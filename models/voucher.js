const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    voucherNo: {
        type: String,
        required: true
    },
    transectionType: {
        type: String,
        required: true
    },
    transectionTypeSlug: {
        type: String,
        required: true
    },
    transectionAccount: {
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