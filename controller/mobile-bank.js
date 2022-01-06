// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const MobileBank = require('../models/mobile-bank');

exports.addMobileBank = async (req, res, next) => {
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
     
    const mobileBank = new MobileBank(data);

    try {
        const response = await mobileBank.save();
        res.status(200).json({
            response,
            message: 'Mobile Bank Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllMobileBanks = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allMobileBank = await MobileBank.find();

    try {
        res.status(200).json({
            data: allMobileBank,
            count: allMobileBank.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getMobileBankByMobileBankId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const mobileBankId = req.params.mobileBankId;
    const mobileBank = await MobileBank.findOne({_id: mobileBankId});

    try {
        res.status(200).json({
            data: mobileBank,
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

exports.getSingleMobileBankBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await MobileBank.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Mobile Bank fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editMobileBankData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await MobileBank.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Mobile Bank Updated Successfully!'
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

exports.deleteMobileBankByMobileBankId = async (req, res, next) => {

    const mobileBankId = req.params.mobileBankId;
    await mobileBank.deleteOne({_id: mobileBankId});

    try {
        res.status(200).json({
            message: 'Mobile Bank Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}