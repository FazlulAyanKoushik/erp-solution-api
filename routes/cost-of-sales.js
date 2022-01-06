// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/cost-of-sales');

const router = express.Router();

/**
 * /cost-of-sales
 * http://localhost:3000/api/cost-of-sales
 */


router.post('/add-cost-of-sales', controller.addCostOfSales);
router.get('/get-all-cost-of-sales', controller.getAllCostOfSaless);
router.get('/get-cost-of-sales-by-cost-of-sales-id/:costOfSalesId', controller.getCostOfSalesByCostOfSalesId);
router.get('/get-single-cost-of-sales-by-slug/:slug', controller.getSingleCostOfSalesBySlug);
router.put('/edit-cost-of-sales-by-cost-of-sales', controller.editCostOfSalesData);
router.delete('/delete-cost-of-sales-by-id/:costOfSalesId', controller.deleteCostOfSalesByCostOfSalesId);

// Export All router..
module.exports = router;