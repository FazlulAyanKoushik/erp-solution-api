const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    accountsName: [{
        type: String,
        required: false
    }],
    amount: {
        type: Number,
        required: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('Deposit', schema);