// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const PaymentMethod = require('../models/payment-method');

exports.addPaymentMethod = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const data = req.body;
    console.log(data)
     
    const paymentMethod = new PaymentMethod(data);

    try {
        const response = await paymentMethod.save();
        res.status(200).json({
            response,
            message: 'PaymentMethod Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllPaymentMethods = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allPaymentMethod = await PaymentMethod.find();

    try {
        res.status(200).json({
            data: allPaymentMethod,
            count: allPaymentMethod.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getPaymentMethodByPaymentMethodId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const paymentMethodId = req.params.paymentMethodId;
    const paymentMethod = await PaymentMethod.findOne({_id: paymentMethodId});

    try {
        res.status(200).json({
            data: paymentMethod,
        });
    } catch (err) {
        console.log(err)
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getSinglePaymentMethodBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await PaymentMethod.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'PaymentMethod fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editPaymentMethodData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await PaymentMethod.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'PaymentMethod Updated Successfully!'
        });

    } catch (err) {
        console.log(err);
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.deletePaymentMethodByPaymentMethodId = async (req, res, next) => {

    const paymentMethodId = req.params.paymentMethodId;
    await paymentMethod.deleteOne({_id: paymentMethodId});

    try {
        res.status(200).json({
            message: 'PaymentMethod Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}