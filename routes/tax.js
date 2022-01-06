// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/tax');

const router = express.Router();

/**
 * /tax
 * http://localhost:3000/api/tax
 */


router.post('/add-tax', controller.addTax);
router.get('/get-all-taxs', controller.getAllTaxs);
router.get('/get-tax-by-tax-id/:taxId', controller.getTaxByTaxId);
router.get('/get-single-tax-by-slug/:slug', controller.getSingleTaxBySlug);
router.put('/edit-tax-by-tax', controller.editTaxData);
router.delete('/delete-tax-by-id/:taxId', controller.deleteTaxByTaxId);

// Export All router..
module.exports = router;