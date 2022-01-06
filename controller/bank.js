// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const Bank = require('../models/bank');

exports.addBank = async (req, res, next) => {
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
     
    const bank = new Bank(data);

    try {
        const response = await bank.save();
        res.status(200).json({
            response,
            message: 'Bank Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllBanks = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allBank = await Bank.find();

    try {
        res.status(200).json({
            data: allBank,
            count: allBank.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getBankByBankId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const bankId = req.params.bankId;
    const bank = await Bank.findOne({_id: bankId});

    try {
        res.status(200).json({
            data: bank,
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

exports.getSingleBankBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await Bank.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Bank fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editBankData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await Bank.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Bank Updated Successfully!'
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

exports.deleteBankByBankId = async (req, res, next) => {

    const bankId = req.params.bankId;
    await bank.deleteOne({_id: bankId});

    try {
        res.status(200).json({
            message: 'Bank Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}