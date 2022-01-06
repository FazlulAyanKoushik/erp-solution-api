// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/cash');

const router = express.Router();

/**
 * /cash
 * http://localhost:3000/api/cash
 */


router.post('/add-cash', controller.addCash);
router.get('/get-all-cashs', controller.getAllCashs);
router.get('/get-cash-by-cash-id/:cashId', controller.getCashByCashId);
router.get('/get-single-cash-by-slug/:slug', controller.getSingleCashBySlug);
router.put('/edit-cash-by-cash', controller.editCashData);
router.delete('/delete-cash-by-id/:cashId', controller.deleteCashByCashId);

// Export All router..
module.exports = router;