// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const CostOfSales = require('../models/cost-of-sales');

exports.addCostOfSales = async (req, res, next) => {
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
     
    const costOfSales = new CostOfSales(data);

    try {
        const response = await costOfSales.save();
        res.status(200).json({
            response,
            message: 'CostOfSales Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllCostOfSaless = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allCostOfSales = await CostOfSales.find();

    try {
        res.status(200).json({
            data: allCostOfSales,
            count: allCostOfSales.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getCostOfSalesByCostOfSalesId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const costOfSalesId = req.params.costOfSalesId;
    const costOfSales = await CostOfSales.findOne({_id: costOfSalesId});

    try {
        res.status(200).json({
            data: costOfSales,
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

exports.getSingleCostOfSalesBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await CostOfSales.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'CostOfSales fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editCostOfSalesData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await CostOfSales.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'CostOfSales Updated Successfully!'
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

exports.deleteCostOfSalesByCostOfSalesId = async (req, res, next) => {

    const costOfSalesId = req.params.costOfSalesId;
    await costOfSales.deleteOne({_id: costOfSalesId});

    try {
        res.status(200).json({
            message: 'CostOfSales Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}