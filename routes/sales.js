// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/sales');

const router = express.Router();

/**
 * /sale
 * http://localhost:3000/api/sale
 */


router.post('/add-sale', controller.addSale);
router.get('/get-all-sales', controller.getAllSales);
router.get('/get-sale-by-sale-id/:saleId', controller.getSaleBySaleId);
router.get('/get-single-sale-by-slug/:slug', controller.getSingleSaleBySlug);
router.put('/edit-sale-by-sale', controller.editSaleData);
router.delete('/delete-sale-by-id/:saleId', controller.deleteSaleBySaleId);

// Export All router..
module.exports = router;