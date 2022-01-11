// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const CourierService = require('../models/courier-service');

exports.addCourierService = async (req, res, next) => {
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
     
    const courierService = new CourierService(data);

    try {
        const response = await courierService.save();
        res.status(200).json({
            response,
            message: 'Courier Service Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllCourierServices = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allCourierService = await CourierService.find();

    try {
        res.status(200).json({
            data: allCourierService,
            count: allCourierService.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getCourierServiceByCourierServiceId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const courierServiceId = req.params.courierServiceId;
    const courierService = await CourierService.findOne({_id: courierServiceId});

    try {
        res.status(200).json({
            data: courierService,
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

exports.getSingleCourierServiceBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await CourierService.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Courier Service fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editCourierServiceData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await CourierService.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Courier Service Updated Successfully!'
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

exports.deleteCourierServiceByCourierServiceId = async (req, res, next) => {

    const courierServiceId = req.params.courierServiceId;
    await courierService.deleteOne({_id: courierServiceId});

    try {
        res.status(200).json({
            message: 'Courier Service Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}