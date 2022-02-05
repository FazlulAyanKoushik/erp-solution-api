const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    payable: [{
        type: Schema.Types.ObjectId,
        ref: 'Payable',
    
    }],
    tax: [{
        type: Schema.Types.ObjectId,
        ref: 'Tax',
    }],
    equity: [{
        type: Schema.Types.ObjectId,
        ref: 'Equity',
    }],
}, {
    timestamps: true
});


module.exports = mongoose.model('Liability', schema);