// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const ExpenseInventory = require('../models/expense-inventory');

exports.addExpenseInventory = async (req, res, next) => {
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
     
    const expenseInventory = new ExpenseInventory(data);

    try {
        const response = await expenseInventory.save();
        res.status(200).json({
            response,
            message: 'ExpenseInventory Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllExpenseInventorys = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allExpenseInventory = await ExpenseInventory.find();

    try {
        res.status(200).json({
            data: allExpenseInventory,
            count: allExpenseInventory.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getExpenseInventoryByExpenseInventoryId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const expenseInventoryId = req.params.expenseInventoryId;
    const expenseInventory = await ExpenseInventory.findOne({_id: expenseInventoryId});

    try {
        res.status(200).json({
            data: expenseInventory,
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

exports.getSingleExpenseInventoryBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await ExpenseInventory.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'ExpenseInventory fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editExpenseInventoryData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await ExpenseInventory.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'ExpenseInventory Updated Successfully!'
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

exports.deleteExpenseInventoryByExpenseInventoryId = async (req, res, next) => {

    const expenseInventoryId = req.params.expenseInventoryId;
    await expenseInventory.deleteOne({_id: expenseInventoryId});

    try {
        res.status(200).json({
            message: 'ExpenseInventory Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}