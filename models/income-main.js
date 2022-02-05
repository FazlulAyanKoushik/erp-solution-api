const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    sales: [{
        type: Schema.Types.ObjectId,
        ref: 'Sales',
    
    }],
    income: [{
        type: Schema.Types.ObjectId,
        ref: 'Income',
    }],
    revenue: [{
        type: Schema.Types.ObjectId,
        ref: 'Revenue',
    }],
}, {
    timestamps: true
});


module.exports = mongoose.model('IncomeMain', schema);