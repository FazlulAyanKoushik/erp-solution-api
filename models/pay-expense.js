const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    expenseName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payFrom: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('PayExpense', schema);