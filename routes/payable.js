// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/payable');

const router = express.Router();

/**
 * /payable
 * http://localhost:3000/api/payable
 */


router.post('/add-payable', controller.addPayable);
router.get('/get-all-payables', controller.getAllPayables);
router.get('/get-payable-by-payable-id/:payableId', controller.getPayableByPayableId);
router.get('/get-single-payable-by-slug/:slug', controller.getSinglePayableBySlug);
router.put('/edit-payable-by-payable', controller.editPayableData);
router.delete('/delete-payable-by-id/:payableId', controller.deletePayableByPayableId);

// Export All router..
module.exports = router;