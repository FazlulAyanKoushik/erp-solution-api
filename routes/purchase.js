// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/purchase');

const router = express.Router();

/**
 * /purchase
 * http://localhost:3000/api/purchase
 */


router.post('/add-purchase', controller.addPurchase);
router.get('/get-all-purchases', controller.getAllPurchases);
router.get('/get-purchase-by-purchase-id/:purchaseId', controller.getPurchaseByPurchaseId);
router.get('/get-single-purchase-by-slug/:slug', controller.getSinglePurchaseBySlug);
router.put('/edit-purchase-by-purchase', controller.editPurchaseData);
router.delete('/delete-purchase-by-id/:purchaseId', controller.deletePurchaseByPurchaseId);

// Export All router..
module.exports = router;