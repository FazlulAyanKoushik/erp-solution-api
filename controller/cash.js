// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const Cash = require('../models/cash');
const Asset = require('../models/asset');

exports.addCash = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const data = req.body;
     
    const cash = new Cash(data);

    try {
        const response = await cash.save();

        // await Asset.findOneAndUpdate({
        //     "$push": {
        //         cash: response._id
        //     }
        // })

        // const assetResponse = await Asset.save();

        res.status(200).json({
            response,
            message: 'Cash Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllCashs = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allCash = await Cash.find();

    try {
        res.status(200).json({
            data: allCash,
            count: allCash.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getCashByCashId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const cashId = req.params.cashId;
    const cash = await Cash.findOne({_id: cashId});

    try {
        res.status(200).json({
            data: cash,
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

exports.getSingleCashBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await Cash.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Cash fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editCashData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await Cash.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Cash Updated Successfully!'
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

exports.deleteCashByCashId = async (req, res, next) => {

    const cashId = req.params.cashId;
    await cash.deleteOne({_id: cashId});

    try {
        res.status(200).json({
            message: 'Cash Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}