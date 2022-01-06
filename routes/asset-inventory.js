// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/asset-inventory');

const router = express.Router();

/**
 * /asset-inventory
 * http://localhost:3000/api/asset-inventory
 */


router.post('/add-asset-inventory', controller.addAssetInventory);
router.get('/get-all-asset-inventory', controller.getAllAssetInventorys);
router.get('/get-asset-inventory-by-asset-inventory-id/:assetInventoryId', controller.getAssetInventoryByAssetInventoryId);
router.get('/get-single-asset-inventory-by-slug/:slug', controller.getSingleAssetInventoryBySlug);
router.put('/edit-asset-inventory-by-asset-inventory', controller.editAssetInventoryData);
router.delete('/delete-asset-inventory-by-id/:assetInventoryId', controller.deleteAssetInventoryByAssetInventoryId);

// Export All router..
module.exports = router;