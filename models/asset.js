const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    cash: [{
        type: Schema.Types.ObjectId,
        ref: 'Cash',
    }],
    bank: [{
        type: Schema.Types.ObjectId,
        ref: 'Bank',
    }],
    mobileBank: [{
        type: Schema.Types.ObjectId,
        ref: 'MobileBank',
    }],
    receivable: [{
        type: Schema.Types.ObjectId,
        ref: 'Receivable',
    }],
    equipment: [{
        type: Schema.Types.ObjectId,
        ref: 'Equipment',
    }],
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'AssetInventory',
    }],

}, {
    timestamps: true
});


module.exports = mongoose.model('Asset', schema);