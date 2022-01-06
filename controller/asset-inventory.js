// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const AssetInventory = require('../models/asset-inventory');

exports.addAssetInventory = async (req, res, next) => {
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
     
    const assetInventory = new AssetInventory(data);

    try {
        const response = await assetInventory.save();
        res.status(200).json({
            response,
            message: 'Asset Inventory Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllAssetInventorys = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allAssetInventory = await AssetInventory.find();

    try {
        res.status(200).json({
            data: allAssetInventory,
            count: allAssetInventory.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAssetInventoryByAssetInventoryId = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const assetInventoryId = req.params.assetInventoryId;
    const assetInventory = await AssetInventory.findOne({_id: assetInventoryId});

    try {
        res.status(200).json({
            data: assetInventory,
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

exports.getSingleAssetInventoryBySlug = async (req, res, next) => {
    console.log(req.params.slug);
    const slug = req.params.slug;
    try {
        const query = {slug: slug};
        const data = await AssetInventory.findOne(query)

        console.log(data);

        res.status(200).json({
            data: data,
            message: 'Asset Inventory fetch Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.editAssetInventoryData = async (req, res, next) => {

    const updatedData = req.body;

    try {
        await AssetInventory.updateOne({_id: updatedData._id}, {$set: updatedData})
        res.status(200).json({
            message: 'Asset Inventory Updated Successfully!'
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

exports.deleteAssetInventoryByAssetInventoryId = async (req, res, next) => {

    const assetInventoryId = req.params.assetInventoryId;
    await assetInventory.deleteOne({_id: assetInventoryId});

    try {
        res.status(200).json({
            message: 'Asset Inventory Deleted Successfully',
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}