const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    contactNo: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    openingBalance: {
        type: Number,
        required: false
    },
}, {
    timestamps: true
});


module.exports = mongoose.model('CourierService', schema);