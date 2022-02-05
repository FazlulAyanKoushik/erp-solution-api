// Require Main Modules..
const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Require Post Schema from Model..
const Asset = require('../models/asset');

exports.addAsset = async (req, res, next) => {
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
     
    const asset = new Asset(data);

    try {
        const response = await asset.save();
        res.status(200).json({
            response,
            message: 'Asset Added Successfully!'
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

exports.getAllAssets = async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error = new Error('Input Validation Error! Please complete required information.');
        error.statusCode = 422;
        error.data = errors.array();
        next(error)
        return;
    }

    const allAsset = await Asset.find();

    try {
        res.status(200).json({
            data: allAsset,
            count: allAsset.length
        });
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
            err.message = 'Something went wrong on database operation!'
        }
        next(err);
    }
}

// exports.getAssetByAssetId = async (req, res, next) => {
//     const errors = validationResult(req);

//     if (!errors.isEmpty()) {
//         const error = new Error('Input Validation Error! Please complete required information.');
//         error.statusCode = 422;
//         error.data = errors.array();
//         next(error)
//         return;
//     }

//     const assetId = req.params.assetId;
//     const asset = await Asset.findOne({_id: assetId});

//     try {
//         res.status(200).json({
//             data: asset,
//         });
//     } catch (err) {
//         console.log(err)
//         if (!err.statusCode) {
//             err.statusCode = 500;
//             err.message = 'Something went wrong on database operation!'
//         }
//         next(err);
//     }
// }

// exports.getSingleAssetBySlug = async (req, res, next) => {
//     console.log(req.params.slug);
//     const slug = req.params.slug;
//     try {
//         const query = {slug: slug};
//         const data = await Asset.findOne(query)

//         console.log(data);

//         res.status(200).json({
//             data: data,
//             message: 'Asset fetch Successfully!'
//         });
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//             err.message = 'Something went wrong on database operation!'
//         }
//         next(err);
//     }
// }

// exports.editAssetData = async (req, res, next) => {

//     const updatedData = req.body;

//     try {
//         await Asset.updateOne({_id: updatedData._id}, {$set: updatedData})
//         res.status(200).json({
//             message: 'Asset Updated Successfully!'
//         });

//     } catch (err) {
//         console.log(err);
//         if (!err.statusCode) {
//             err.statusCode = 500;
//             err.message = 'Something went wrong on database operation!'
//         }
//         next(err);
//     }
// }

// exports.deleteAssetByAssetId = async (req, res, next) => {

//     const assetId = req.params.assetId;
//     await asset.deleteOne({_id: assetId});

//     try {
//         res.status(200).json({
//             message: 'Asset Deleted Successfully',
//         });
//     } catch (err) {
//         if (!err.statusCode) {
//             err.statusCode = 500;
//             err.message = 'Something went wrong on database operation!'
//         }
//         next(err);
//     }
// }