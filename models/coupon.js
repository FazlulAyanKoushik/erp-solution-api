
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema(
    {
        couponName: {
            type: String,
            required: true
        },
        couponAmount: {
            type: Number,
            required: true
        },
        couponCode: {
            type: String,
            required: true
        },
        couponType: {
            type: Number,
            required: true
        },
        couponDiscountType: {
            type: Number,
            required: true
        },
        couponLimit: {
            type: Number,
            required: false 
        },
        couponStartDate: {
            type: Date,
            required: true
        },
        couponEndDate: {
            type: Date,
            required: true
        },
        couponUsedByUser: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Coupon', schema);


