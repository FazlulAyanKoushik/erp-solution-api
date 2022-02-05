const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    expense: [{
        type: Schema.Types.ObjectId,
        ref: 'Expense',
    }],
    purchase: [{
        type: Schema.Types.ObjectId,
        ref: 'Purchase',
    }],
    costOfSales: [{
        type: Schema.Types.ObjectId,
        ref: 'CostOfSales',
    }],
    inventory: [{
        type: Schema.Types.ObjectId,
        ref: 'ExpenseInventory',
    }],
}, {
    timestamps: true
});


module.exports = mongoose.model('ExpenseMain', schema);