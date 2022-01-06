// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const Revenue = require('../models/revenue');

exports.addRevenue = async (req, res, next) => {
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
     
    const revenue = new Revenue(data);

    try {
        const response = await revenue.save();
        res.status(200).json({
            response,
            message: 'Revenue Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllRevenues = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allRevenue = await Revenue.find();

    try {
        res.status(200).json({
            data: allRevenue,
            count: allRevenue.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getRevenueByRevenueId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const revenueId = req.params.revenueId;
    const revenue = await Revenue.findOne({_id: revenueId});

    try {
        res.status(200).json({
            data: revenue,
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

exports.getSingleRevenueBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await Revenue.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Revenue fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editRevenueData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await Revenue.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Revenue Updated Successfully!'
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

exports.deleteRevenueByRevenueId = async (req, res, next) => {

    const revenueId = req.params.revenueId;
    await revenue.deleteOne({_id: revenueId});

    try {
        res.status(200).json({
            message: 'Revenue Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}