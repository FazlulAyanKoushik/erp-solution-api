const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    transationFrom: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionTo: {
        type: String,
        required: true
    },
    charge: {
        type: Number,
        required: false
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('AllTypeTransaction', schema);