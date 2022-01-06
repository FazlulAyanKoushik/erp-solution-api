// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/receivable');

const router = express.Router();

/**
 * /receivable
 * http://localhost:3000/api/receivable
 */


router.post('/add-receivable', controller.addReceivable);
router.get('/get-all-receivables', controller.getAllReceivables);
router.get('/get-receivable-by-receivable-id/:receivableId', controller.getReceivableByReceivableId);
router.get('/get-single-receivable-by-slug/:slug', controller.getSingleReceivableBySlug);
router.put('/edit-receivable-by-receivable', controller.editReceivableData);
router.delete('/delete-receivable-by-id/:receivableId', controller.deleteReceivableByReceivableId);

// Export All router..
module.exports = router;