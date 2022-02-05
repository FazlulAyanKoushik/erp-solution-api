// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/asset');

const router = express.Router();

/**
 * /asset
 * http://localhost:3000/api/asset
 */


router.post('/add-asset', controller.addAsset);
router.get('/get-all-assets', controller.getAllAssets);
// router.get('/get-asset-by-asset-id/:assetId', controller.getAssetByAssetId);
// router.get('/get-single-asset-by-slug/:slug', controller.getSingleAssetBySlug);
// router.put('/edit-asset-by-asset', controller.editAssetData);
// router.delete('/delete-asset-by-id/:assetId', controller.deleteAssetByAssetId);

// Export All router..
module.exports = router;