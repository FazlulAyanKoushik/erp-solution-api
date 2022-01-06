const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    accountName: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: false
    },
    isSubAccount: {
        type: Boolean,
        required: false
    },
    parentAccount: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model('Receivable', schema);